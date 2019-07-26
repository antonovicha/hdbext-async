import { Connection } from "@sap/hana-client";
import { Hdbext, ProcedureFunction } from "@sap/hdbext";
import { promisify } from "util";

import { HanaClientAsync } from "./ConnectionAsync";

class HdbextAsync {
  public readonly loadProcedure: (connection: Connection,
                                  schemaName: string | null,
                                  procedureName: string) => Promise<ProcedureFunction | undefined>;

  private readonly createConnectionAsync: (hanaConfig: {}) => Promise<Connection>;

  /**
   * Creates @class HdbextAsync.
   * @param hdbext object imported from `@sap/hdbext`.
   */
  constructor(public readonly hdbext: Hdbext) {
    this.loadProcedure = promisify(hdbext.loadProcedure);
    this.createConnectionAsync = promisify(hdbext.createConnection);
  }

  public async createConnection(hanaConfig: {}) {
    const connection = await this.createConnectionAsync(hanaConfig);
    return new HanaClientAsync(this, connection);
  }
}

export { HdbextAsync };
