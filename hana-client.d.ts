// tslint:disable:max-classes-per-file
declare module '@sap/hana-client' {
  class Statement {
    public exec<T>(callback: (error: Error, results: T) => void): void;
    public exec<T>(params: any[], callback: (error: Error, results: T) => void): void;
  }

  /**
   * Represents hana client native object that is returned by @sap/hana-client createClient() call.
   */
  class HanaClient {
    public exec<T>(sql: string, callback: (error: Error, result: T) => void): void;
    // public exec<T>(sql: string, params: any | any[], callback: (error: Error, result: T) => void): void;
    public prepare(sql: string, callback: (error: Error, stmt: Statement) => void): void;
    public commit(callback: (error: Error) => void): void;
    public rollback(callback: (error: Error) => void): void;
  }
}
