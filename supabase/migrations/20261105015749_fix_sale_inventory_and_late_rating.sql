-- Keep stock updates in one place: the sales trigger.
-- This covers both the app RPC and direct authenticated inserts.
CREATE OR REPLACE FUNCTION private.manage_sale_inventory()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'pg_catalog', 'public'
AS $function$
DECLARE
  v_name text;
  v_cost numeric;
  v_stock numeric;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.product_id IS NOT NULL THEN
      SELECT p.name, p.cost_price, p.quantity
        INTO v_name, v_cost, v_stock
        FROM public.products p
       WHERE p.id = NEW.product_id AND p.shop_id = NEW.shop_id
       FOR UPDATE;
      IF NOT FOUND THEN RAISE EXCEPTION 'Mahsulot topilmadi'; END IF;
      IF COALESCE(NEW.quantity, 0) <= 0 THEN RAISE EXCEPTION 'Mahsulot miqdori noto‘g‘ri'; END IF;
      IF v_stock < NEW.quantity THEN RAISE EXCEPTION 'Omborda mahsulot yetarli emas'; END IF;
      UPDATE public.products SET quantity = quantity - NEW.quantity
       WHERE id = NEW.product_id AND shop_id = NEW.shop_id;
      NEW.product_name_snapshot := v_name;
      NEW.unit_cost_snapshot := v_cost;
      NEW.cost_total := COALESCE(v_cost, 0) * NEW.quantity;
    ELSE
      IF COALESCE(NEW.quantity, 0) > 0 THEN RAISE EXCEPTION 'Mahsulot tanlanmagan'; END IF;
      NEW.quantity := NULL;
      NEW.cost_total := COALESCE(NEW.cost_total, 0);
    END IF;
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF OLD.product_id IS DISTINCT FROM NEW.product_id
       OR OLD.quantity IS DISTINCT FROM NEW.quantity
       OR OLD.shop_id IS DISTINCT FROM NEW.shop_id THEN
      IF OLD.product_id IS NOT NULL AND COALESCE(OLD.quantity, 0) > 0 THEN
        UPDATE public.products SET quantity = quantity + OLD.quantity
         WHERE id = OLD.product_id AND shop_id = OLD.shop_id;
      END IF;
      IF NEW.product_id IS NOT NULL THEN
        SELECT p.name, p.cost_price, p.quantity
          INTO v_name, v_cost, v_stock
          FROM public.products p
         WHERE p.id = NEW.product_id AND p.shop_id = NEW.shop_id
         FOR UPDATE;
        IF NOT FOUND THEN RAISE EXCEPTION 'Mahsulot topilmadi'; END IF;
        IF COALESCE(NEW.quantity, 0) <= 0 THEN RAISE EXCEPTION 'Mahsulot miqdori noto‘g‘ri'; END IF;
        IF v_stock < NEW.quantity THEN RAISE EXCEPTION 'Omborda mahsulot yetarli emas'; END IF;
        UPDATE public.products SET quantity = quantity - NEW.quantity
         WHERE id = NEW.product_id AND shop_id = NEW.shop_id;
        NEW.product_name_snapshot := v_name;
        NEW.unit_cost_snapshot := v_cost;
        NEW.cost_total := COALESCE(v_cost, 0) * NEW.quantity;
      ELSE
        NEW.quantity := NULL;
        NEW.cost_total := 0;
        NEW.product_name_snapshot := NULL;
        NEW.unit_cost_snapshot := NULL;
      END IF;
    END IF;
    RETURN NEW;
  END IF;

  IF TG_OP = 'DELETE' THEN
    IF OLD.product_id IS NOT NULL AND COALESCE(OLD.quantity, 0) > 0 THEN
      UPDATE public.products SET quantity = quantity + OLD.quantity
       WHERE id = OLD.product_id AND shop_id = OLD.shop_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION private.record_sale_atomic(
  p_shop_id uuid, p_name text, p_amount numeric, p_payment_type text,
  p_product_id uuid DEFAULT NULL, p_quantity numeric DEFAULT NULL,
  p_cost_total numeric DEFAULT 0, p_buyer_name text DEFAULT NULL,
  p_buyer_phone text DEFAULT NULL, p_due_date date DEFAULT NULL,
  p_note text DEFAULT NULL, p_claim_code text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'pg_catalog', 'public', 'auth', 'extensions'
AS $function$
DECLARE
  v_sale_id uuid;
  v_debt_id uuid;
  v_buyer_id uuid;
  v_phone text;
  v_stock numeric;
  v_code text;
  v_product_name text;
  v_unit_cost numeric;
  v_sale_name text;
  v_cost_total numeric;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Kirish talab qilinadi'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.shops s WHERE s.id=p_shop_id AND s.owner_id=auth.uid()) THEN
    RAISE EXCEPTION 'Bu do‘konga ruxsat yo‘q';
  END IF;
  IF COALESCE(p_amount,0)<=0 THEN RAISE EXCEPTION 'Savdo summasi 0 dan katta bo‘lishi kerak'; END IF;
  IF p_payment_type NOT IN ('naqd','karta','qarz') THEN RAISE EXCEPTION 'To‘lov turi noto‘g‘ri'; END IF;
  IF COALESCE(p_cost_total,0)<0 THEN RAISE EXCEPTION 'Tannarx noto‘g‘ri'; END IF;
  IF p_payment_type='qarz' AND NULLIF(TRIM(COALESCE(p_buyer_name,'')),'') IS NULL THEN
    RAISE EXCEPTION 'Qarzdor ismi kiritilishi kerak';
  END IF;
  IF p_due_date IS NOT NULL AND p_due_date<current_date THEN
    RAISE EXCEPTION 'To‘lov muddati bugundan oldin bo‘lishi mumkin emas';
  END IF;

  v_sale_name:=NULLIF(TRIM(COALESCE(p_name,'')),'');
  IF p_product_id IS NOT NULL THEN
    IF COALESCE(p_quantity,0)<=0 THEN RAISE EXCEPTION 'Mahsulot miqdori noto‘g‘ri'; END IF;
    SELECT pr.quantity,pr.name,pr.cost_price INTO v_stock,v_product_name,v_unit_cost
      FROM public.products pr WHERE pr.id=p_product_id AND pr.shop_id=p_shop_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Mahsulot topilmadi'; END IF;
    IF v_stock<p_quantity THEN RAISE EXCEPTION 'Omborda mahsulot yetarli emas'; END IF;
    -- The BEFORE INSERT trigger performs the single stock decrement.
    v_cost_total:=COALESCE(v_unit_cost,0)*p_quantity;
    v_sale_name:=COALESCE(v_sale_name,v_product_name);
  ELSE
    IF COALESCE(p_quantity,0)>0 THEN RAISE EXCEPTION 'Mahsulot tanlanmagan'; END IF;
    v_cost_total:=COALESCE(p_cost_total,0);
  END IF;
  IF v_sale_name IS NULL THEN RAISE EXCEPTION 'Savdo nomini kiriting'; END IF;

  INSERT INTO public.sales
    (shop_id,name,amount,payment_type,product_id,quantity,cost_total,product_name_snapshot,unit_cost_snapshot)
  VALUES
    (p_shop_id,v_sale_name,p_amount,p_payment_type,p_product_id,NULLIF(p_quantity,0),v_cost_total,v_product_name,v_unit_cost)
  RETURNING id INTO v_sale_id;

  IF p_payment_type='qarz' THEN
    v_phone:=public.norm_phone(p_buyer_phone);
    IF v_phone<>'' THEN
      SELECT pr.id INTO v_buyer_id
        FROM public.profiles pr JOIN auth.users u ON u.id=pr.id
       WHERE pr.role='buyer' AND u.phone_confirmed_at IS NOT NULL
         AND public.norm_phone(u.phone)=v_phone AND public.norm_phone(pr.phone)=v_phone
       LIMIT 1;
    END IF;
    v_code:=NULL;
    IF v_buyer_id IS NULL THEN
      v_code:=UPPER(TRIM(COALESCE(p_claim_code,'')));
      IF v_code='' THEN v_code:=UPPER(SUBSTR(ENCODE(gen_random_bytes(6),'hex'),1,12)); END IF;
    END IF;
    INSERT INTO public.debts
      (shop_id,buyer_id,amount,due_date,description,status,buyer_name,buyer_phone,note,claim_code)
    VALUES
      (p_shop_id,v_buyer_id,p_amount,p_due_date,p_note,'pending',TRIM(p_buyer_name),
       NULLIF(TRIM(COALESCE(p_buyer_phone,'')),''),p_note,v_code)
    RETURNING id INTO v_debt_id;
    UPDATE public.sales SET debt_id=v_debt_id WHERE id=v_sale_id;
  END IF;

  RETURN jsonb_build_object('sale_id',v_sale_id,'debt_id',v_debt_id,'claim_code',v_code);
END;
$function$;

CREATE OR REPLACE FUNCTION public.rating_on_payment_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'pg_catalog', 'public', 'auth'
AS $function$
DECLARE
  d public.debts;
  paid_total numeric;
  paid_date date;
BEGIN
  SELECT * INTO d FROM public.debts WHERE id=NEW.debt_id;
  IF NOT FOUND OR d.buyer_id IS NULL OR d.due_date IS NULL THEN RETURN NEW; END IF;

  SELECT COALESCE(SUM(amount),0) INTO paid_total
    FROM public.payments WHERE debt_id=d.id;

  IF paid_total>=d.amount THEN
    paid_date:=timezone('Asia/Tashkent',COALESCE(NEW.paid_at,now()))::date;
    IF paid_date<=d.due_date THEN
      INSERT INTO public.buyer_rating_events
        (buyer_id,shop_id,debt_id,event_type,points,status,reason,applied_at)
      VALUES
        (d.buyer_id,d.shop_id,d.id,'on_time_payment',2,'applied','Qarz o‘z vaqtida to‘liq to‘landi',now())
      ON CONFLICT (debt_id,event_type)
        WHERE debt_id IS NOT NULL AND event_type IN ('late_payment','on_time_payment')
      DO NOTHING;
    ELSE
      INSERT INTO public.buyer_rating_events
        (buyer_id,shop_id,debt_id,event_type,points,status,reason,applied_at)
      VALUES
        (d.buyer_id,d.shop_id,d.id,'late_payment',-10,'applied','Qarz muddati o‘tgandan keyin to‘liq to‘landi',now())
      ON CONFLICT (debt_id,event_type)
        WHERE debt_id IS NOT NULL AND event_type IN ('late_payment','on_time_payment')
      DO NOTHING;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
