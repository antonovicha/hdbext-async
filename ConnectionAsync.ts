import { Connection } from "@sap/hana-client";
import { promisify } from "util";

import { StatementAsync } from "./StatementAsync";

class ConnectionAsync {
  public readonly exec: <T>(sql: string, params?: any[], options?: {}) => Promise<T>;
  public readonly commit: () => Promise<void>;
  public readonly rollback: () => Promise<void>;
  public readonly prepare: (sql: string) => Promise<StatementAsync>;

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
