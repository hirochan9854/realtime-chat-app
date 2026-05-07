DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'channels'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE channels;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE messages;
  END IF;
END $$;

-- Prisma が作ったテーブルに anon / authenticated ロールの SELECT 権限を付与
-- これがないと Supabase Realtime の postgres_changes payload が空になる
GRANT SELECT ON public.channels  TO anon, authenticated;
GRANT SELECT ON public.messages  TO anon, authenticated;
GRANT SELECT ON public.profiles  TO anon, authenticated;
