// 型安全なモック生成ユーティリティ
// Repository のモックデータを生成する際に使用

export function createMockData<T>(defaults: T, overrides?: Partial<T>): T {
  return { ...defaults, ...overrides };
}
