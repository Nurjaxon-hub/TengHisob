-- These tables are consumed by the app's realtime subscriptions.
ALTER PUBLICATION supabase_realtime ADD TABLE public.buyer_rating_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.buyer_rating_appeals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sales;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
