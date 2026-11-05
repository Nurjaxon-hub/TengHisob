-- A debt may be linked to an account only when that account's phone is verified.
DROP POLICY IF EXISTS debts_insert ON public.debts;
CREATE POLICY debts_insert
ON public.debts
FOR INSERT
TO authenticated
WITH CHECK (
  shop_id IN (SELECT s.id FROM public.shops s WHERE s.owner_id=(SELECT auth.uid()))
  AND COALESCE(status,'pending')='pending'
  AND buyer_response_note IS NULL
  AND (
    buyer_id IS NULL
    OR EXISTS (
      SELECT 1
      FROM public.profiles p
      JOIN auth.users u ON u.id=p.id
      WHERE p.id=debts.buyer_id
        AND p.role='buyer'
        AND u.phone_confirmed_at IS NOT NULL
        AND public.norm_phone(u.phone)<>''
        AND public.norm_phone(u.phone)=public.norm_phone(debts.buyer_phone)
        AND public.norm_phone(p.phone)=public.norm_phone(u.phone)
        AND public.norm_phone(debts.buyer_phone)<>''
    )
  )
);
