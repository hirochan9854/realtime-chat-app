-- Realtimeの有効化
-- prisma migrate dev でテーブルを作成した後に実行される
ALTER PUBLICATION supabase_realtime ADD TABLE channels;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- 開発用テストデータ（任意）
-- INSERT INTO profiles (id, username) VALUES
--   ('00000000-0000-0000-0000-000000000001', 'Alice'),
--   ('00000000-0000-0000-0000-000000000002', 'Bob');

-- INSERT INTO channels (name, created_by) VALUES
--   ('general', '00000000-0000-0000-0000-000000000001'),
--   ('random', '00000000-0000-0000-0000-000000000001');
