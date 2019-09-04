import { Connection, Statement } from "@sap/hana-client";
import { ParamsMetadata, SpParam, SpParamResult } from "@sap/hdbext";
import { promisify } from "util";

import { HdbextAsync } from "./HdbextAsync";
import { StatementAsync } from "./StatementAsync";

// tslint:disable: interface-name
interface ProcedureFunctionAsync {
    (parameters: SpParam[]): Promise<SpParamResult[]>;
    <TResult>(parameters: SpParam[]): Promise<TResult[]>;
    // tslint:disable-next-line: unified-signatures
    (parameters: {[key: string]: SpParam}): Promise<SpParamResult[]>;
    // tslint:disable-next-line: unified-signatures
    <TResult>(parameters: {[key: string]: SpParam}): Promise<TResult[]>;
    paramsMetadata: ParamsMetadata[];
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
    this.exec = promisify(connection.exec.bind(connection));
    this.commit = promisify(connection.commit.bind(connection));
    this.rollback = promisify(connection.rollback.bind(connection));
    this.prepareAsync = promisify(connection.prepare.bind(connection));
  }

  public async loadProcedure(schemaName: string | null, procedureName: string) {
    const spFunc = await this.hdbextAsync.loadProcedure(this.connection, schemaName, procedureName);
    if (!spFunc) {
      return undefined;
    }

    const customAsync = (params: SpParam[]) => new Promise<SpParamResult[]>((resolve, reject) => {
      spFunc(params, (error: Error | null, ...parameters: SpParamResult[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(parameters);
        }
      });
    });

    (spFunc as any)[promisify.custom] = customAsync;
    const spFuncPromisified = promisify(spFunc) as any as ProcedureFunctionAsync;
    spFuncPromisified.paramsMetadata = spFunc.paramsMetadata;

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
