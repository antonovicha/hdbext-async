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

class HanaClientAsync {
  public readonly commit: () => Promise<void>;
  public readonly rollback: () => Promise<void>;

  private prepareAsync: (sql: string) => Promise<Statement>;

  //   var hdb = require("@sap/hana-client");
  //   client = hdb.createClient(options);
  //   req.db = client;
  /**
   * Creates @class HanaClientAsync.
   * @param connection native hana `connection` aka `hana-client`.
   */
  constructor(public readonly hdbextAsync: HdbextAsync, public readonly connection: Connection) {
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

  public async exec<T>(sql: string, params?: SpParam[], options?: {}) {
    const promise = new Promise<T>((resolve, reject) => {

      this.connection.exec<T>(sql, params, options, (error: Error | null, ...result: any[]) => {
        if (error) {
          reject(error);
        } else {
          if (result.length === 0) {
            resolve();
          } else if (result.length === 1) {
            resolve(result[0]);
          } else {
            // TODO: better express types here.
            // AFAIK T could be array or rows or tuple of array of rows.
            resolve(result as any);
          }
        }
      });
    });

    return promise;
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

export { HanaClientAsync as HanaClientAsync };
