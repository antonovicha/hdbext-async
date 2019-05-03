import { Connection } from "@sap/hana-client";
import { promisify } from "util";
import { StatementAsync } from "./StatementAsync";

class ConnectionAsync {
  public exec: <T>(sql: string) => Promise<T>;
  public commit: () => Promise<void>;
  public rollback: () => Promise<void>;
  public prepare: (sql: string) => Promise<StatementAsync>;

  //   var hdb = require("@sap/hana-client");
  //   client = hdb.createClient(options);
  //   req.db = client;
  /**
   * Creates @class ConnectionAsync.
   * @param connetion native hana `connection` aka `hana-client`.
   */
  constructor(connetion: Connection) {
    this.exec = promisify(connetion.exec);
    this.commit = promisify(connetion.commit);
    this.rollback = promisify(connetion.rollback);
    const prepareAsync = promisify(connetion.prepare);
    this.prepare = async (sql: string) => {
      const stmt = await prepareAsync(sql);
      return new StatementAsync(stmt);
    };
  }
}

export { ConnectionAsync as HanaClientAsync };
