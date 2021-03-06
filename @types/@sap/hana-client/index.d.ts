// tslint:disable:max-classes-per-file unified-signatures
declare module "@sap/hana-client" {
  /**
   * Represents hana prepared statement created by `Connection.prepare` call.
   *
   * Implemented as native 'class Connection'.
   */
  class Statement {
    /**
     * exec[ute]([params][, options][, callback])
     */
    public exec<TResults>(callback: (error: Error | null, results: TResults) => void): void;
    public exec<TResults>(
      params: Array<string | number | boolean>,
      callback: (error: Error | null, results: TResults) => void,
    ): void;
    public exec<TResults>(
      options: {},
      callback: (error: Error | null, results: TResults) => void,
    ): void;
    public exec<TResults>(
      params: Array<string | number | boolean>,
      options: {},
      callback: (error: Error | null, results: TResults) => void,
    ): void;

    public isValid(): boolean;

    /**
     * exec[ute]Query([params][, callback])
     */
    public execQuery<TResults>(callback: (error: Error | null, results: TResults) => void): void;
    public execQuery<TResults>(
      params: Array<string | number | boolean>,
      callback: (error: Error | null, results: TResults) => void,
    ): void;

    /**
     * exec[ute]Batch([params][, callback])
     */
    public execBatch<TResults>(callback: (error: Error | null, results: TResults) => void): void;
    public execBatch<TResults>(
      params: Array<string | number | boolean>,
      callback: (error: Error | null, results: TResults) => void,
      ): void;

    /**
     * drop([callback])
     */
    public drop(callback: (error: Error) => void): void;

    public getParameterInfo(): Array<{}>;

    /**
     * getParameterValue(paramIndex[, callback])
     */
    public getParameterValue<TValue>(index: number, callback: (error: Error | null, result: TValue) => void): void;

    // NODE_SET_PROTOTYPE_METHOD(tpl, "execute", exec);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "executeQuery", execQuery);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "executeBatch", execBatch);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "getParameterValue", getParameterValue);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "sendParameterData", sendParameterData);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "getData", getData);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "functionCode", functionCode);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "getColumnInfo", getColumnInfo);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "getPrintLines", getPrintLines);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "getRowStatus", getRowStatus);
  }

  /**
   * Represents hana client native object that is returned by `@sap/hana-client createClient()` call.
   *
   * Implemented in `@sap/hana-client` as 'class Connection'.
   * TODO: what to do with duplicates?
   * NOTE: non async function overloads mostly ignored.
   * NOTE: only sane parameter permutations are declared.
   */
  class Connection {
    /**
     * exec[ute](sql[, params][, options][, callback])
     */
    // 2 params:
    public exec(sql: string, params: Array<string | number | boolean>): void;
    public exec(sql: string, options: {}): void;
    public exec<T>(sql: string, callback: (error: Error | null, result: T) => void): void;
    // 3 params:
    public exec<T>(sql: string,
                   params: string | number | boolean,
                   callback: (error: Error | null, result: T) => void): void;
    public exec(sql: string, params: string | number | boolean, options: {}): void;
    public exec<T>(sql: string, options: {}, callback: (error: Error | null, result: T) => void): void;
    // 4 params:
    public exec<T>(sql: string,
                   params: string | number | boolean,
                   options: {},
                   callback: (error: Error | null, result: T) => void): void;

    /**
     * prepare(sql, [callback])
     */
    public prepare(sql: string, callback: (error: Error | null, stmt: Statement) => void): void;

    /**
     * connect(conn_params[, callback])
     */
    public connect(callback: (error: Error) => void): void;
    public connect(params: number | string | {}, callback: (error: Error) => void): void;

    /**
     * disconnect([callback])
     */
    public disconnect(callback: (error: Error) => void): void;
    public close(callback: (error: Error) => void): void;
    public close(): void;

    /**
     * commit([callback])
     */
    public commit(callback: (error: Error) => void): void;

    /**
     * rollback([callback])
     */
    public rollback(callback: (error: Error) => void): void;

    /**
     * setAutoCommit(flag)
     */
    public setAutoCommit(flag: boolean): void;

    /**
     * getClientInfo(key)
     */
    public getClientInfo(key: string): void;

    /**
     * setClientInfo(key, value)
     */
    public setClientInfo(key: string, value: string | null): void;

    /**
     * setWarningCallback(callback)
     */
    public setWarningCallback(callback: ((error: Error) => void) | null): void;

    /**
     * connected
     */
    public connected(): "connected" | "disconnected";

    /**
     * next([callback])
     */
    public clearPool(): void | number;
    public clearPool(callback: (error: Error) => void): void;

    // Duplicated functions / methods:
    // NODE_SET_PROTOTYPE_METHOD(tpl, "execute", exec);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "end", disconnect);
  }
}
