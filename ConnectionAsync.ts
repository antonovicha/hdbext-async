import { Connection } from "@sap/hana-client";
import { ProcedureFunctionParams, ProcedureFunctionResult } from "@sap/hdbext";
import { promisify } from "util";

import { HdbextAsync } from "HdbextAsync";
import { StatementAsync } from "StatementAsync";

class ConnectionAsync {
  public readonly exec: <T>(sql: string, params?: any[], options?: {}) => Promise<T>;
  public readonly commit: () => Promise<void>;
  public readonly rollback: () => Promise<void>;
  public readonly prepare: (sql: string) => Promise<StatementAsync>;
  public readonly loadProcedure: (schemaName: string | null, procedureName: string) =>
                                  Promise<(parameters: ProcedureFunctionParams) => Promise<ProcedureFunctionResult>>;
  public readonly setAutoCommit: (flag: boolean) => void;
  public readonly close: () => void;

  //   var hdb = require("@sap/hana-client");
  //   client = hdb.createClient(options);
  //   req.db = client;
  /**
   * Creates @class ConnectionAsync.
   * @param connection native hana `connection` aka `hana-client`.
   */
  constructor(hdbext: HdbextAsync, connection: Connection) {
    this.exec = promisify(connection.exec);
    this.commit = promisify(connection.commit);
    this.rollback = promisify(connection.rollback);
    this.loadProcedure = async (schemaName: string | null, procedureName: string) => {
      const spFunc = await hdbext.loadProcedure(connection, schemaName, procedureName);
      const spFuncPromisified = promisify<ProcedureFunctionParams, ProcedureFunctionResult>(spFunc as any);
      return spFuncPromisified;
    };
    const prepareAsync = promisify(connection.prepare);
    this.prepare = async (sql: string) => {
      const stmt = await prepareAsync(sql);
      return new StatementAsync(stmt);
    };
    this.setAutoCommit = (flag) => connection.setAutoCommit(flag);
    this.close = () => connection.close();
  }
}

export { ConnectionAsync as HanaClientAsync };
