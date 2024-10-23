export type MockServiceType<T> = jest.Mocked<Pick<T, keyof T>>;
