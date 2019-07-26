import { Connection, Statement } from "@sap/hana-client";
import { ProcedureFunctionResult, SpParam } from "@sap/hdbext";
import { promisify } from "util";

import { HdbextAsync } from "./HdbextAsync";
import { StatementAsync } from "./StatementAsync";

// tslint:disable: interface-name
interface ProcedureFunctionAsync {
    (...parameters: SpParam[]): Promise<ProcedureFunctionResult>;
    (parameters: SpParam[]): Promise<ProcedureFunctionResult>;
    // tslint:disable-next-line: unified-signatures
    (parameters: {[key: string]: SpParam}): Promise<ProcedureFunctionResult>;
}
// tslint:enable: interface-name

class ConnectionAsync {
  public readonly exec: <T>(sql: string, params?: any[], options?: {}) => Promise<T>;
  public readonly commit: () => Promise<void>;
  public readonly rollback: () => Promise<void>;

  private prepareAsync: (sql: string) => Promise<Statement>;

  //   var hdb = require("@sap/hana-client");
  //   client = hdb.createClient(options);
  //   req.db = client;
  /**
   * Creates @class ConnectionAsync.
   * @param connection native hana `connection` aka `hana-client`.
   */
  constructor(public readonly hdbextAsync: HdbextAsync, public readonly connection: Connection) {
    this.exec = promisify(connection.exec);
    this.commit = promisify(connection.commit);
    this.rollback = promisify(connection.rollback);
    this.prepareAsync = promisify(connection.prepare);
  }

  public async loadProcedure(schemaName: string | null, procedureName: string) {
    const spFunc = await this.hdbextAsync.loadProcedure(this.connection, schemaName, procedureName);
    if (!spFunc) {
      return undefined;
    }
    const spFuncPromisified = promisify(spFunc) as any as ProcedureFunctionAsync;
    return spFuncPromisified;
  }

  public async prepare(sql: string) {
    const stmt = await this.prepareAsync(sql);
    return new StatementAsync(stmt);
  }

  public setAutoCommit(flag: boolean) {
    this.connection.setAutoCommit(flag);
  }

  public close() {
    this.connection.close();
  }
}

export { ConnectionAsync as HanaClientAsync };
