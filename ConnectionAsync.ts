import { Connection } from "@sap/hana-client";
import { promisify } from "util";
import { StatementAsync } from "./StatementAsync";

class ConnectionAsync {
  public exec: <T>(sql: string, params?: any[], options?: {}) => Promise<T>;
  public commit: () => Promise<void>;
  public rollback: () => Promise<void>;
  public prepare: (sql: string) => Promise<StatementAsync>;

  //   var hdb = require("@sap/hana-client");
  //   client = hdb.createClient(options);
  //   req.db = client;
  /**
   * Creates @class ConnectionAsync.
   * @param connection native hana `connection` aka `hana-client`.
   */
  constructor(connection: Connection) {
    this.exec = promisify(connection.exec);
    this.commit = promisify(connection.commit);
    this.rollback = promisify(connection.rollback);
    const prepareAsync = promisify(connection.prepare);
    this.prepare = async (sql: string) => {
      const stmt = await prepareAsync(sql);
      return new StatementAsync(stmt);
    };
  }
}

export { ConnectionAsync as HanaClientAsync };
