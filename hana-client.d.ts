// tslint:disable:max-classes-per-file
declare module "@sap/hana-client" {
  /**
   * Represents hana prepared statement created by `Connection.prepare` call.
   *
   * Implemented as native 'class Connection'.
   */
  class Statement {
    public exec<TResults>(
      params?: any[] | null,
      options?: {} | null,
      callback?: ((error: Error, results: TResults) => void) | null,
    ): void;
    // NODE_SET_PROTOTYPE_METHOD(tpl, "isValid", isValid);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "execute", exec);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "execQuery", execQuery);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "executeQuery", execQuery);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "execBatch", execBatch);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "executeBatch", execBatch);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "drop", drop);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "getParameterInfo", getParameterInfo);
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
   * Implemented as 'class Connection'.
   */
  class Connection {
    public exec<T>(sql: string, callback: (error: Error, result: T) => void): void;
    // public exec<T>(sql: string, params: any | any[], callback: (error: Error, result: T) => void): void;
    public prepare(sql: string, callback: (error: Error, stmt: Statement) => void): void;
    public commit(callback: (error: Error) => void): void;
    public rollback(callback: (error: Error) => void): void;
    // NODE_SET_PROTOTYPE_METHOD(tpl, "exec", exec);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "execute", exec);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "prepare", prepare);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "connect", connect);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "disconnect", disconnect);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "close", disconnect);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "end", disconnect);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "commit", commit);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "rollback", rollback);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "setAutoCommit", setAutoCommit);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "getClientInfo", getClientInfo);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "setClientInfo", setClientInfo);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "setWarningCallback", setWarningCallback);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "state", state);
    // NODE_SET_PROTOTYPE_METHOD(tpl, "clearPool", clearPool);
  }
}
