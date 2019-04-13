declare module '@sap/hana-client' {
  /**
   * Represents hana client native object that is returned by @sap/hana-client createClient() call.
   */
  class HanaClient {
    public exec<T>(sql: string, fn: (error: Error, result: T) => void): void;
    // public exec<T>(sql: string, params: any | any[], fn: (error: Error, result: T) => void): void;
    // public prepare(sql: string, fn: (error: Error, stmt: any) => void): void;
    public commit(fn: (error: Error) => void): void;
    public rollback(fn: (error: Error) => void): void;
  }
}
