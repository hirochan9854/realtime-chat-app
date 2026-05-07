// Repository切替レジストリ
// 環境変数 USE_MOCK_REPOSITORY=true で MockRepository を使用

export function getRepositoryMode(): "mock" | "real" {
  return process.env.USE_MOCK_REPOSITORY === "true" ? "mock" : "real";
}
