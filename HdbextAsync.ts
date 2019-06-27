import { Connection } from "@sap/hana-client";
import { Hdbext, ProcedureFunction } from "@sap/hdbext";
import { promisify } from "util";

import { HanaClientAsync } from "ConnectionAsync";

class HdbextAsync {
  public readonly createConnection: (hanaConfig: {}) => Promise<HanaClientAsync>;
  public readonly loadProcedure: (connection: Connection,
                                  schemaName: string | null,
                                  procedureName: string) => Promise<ProcedureFunction>;

  /**
   * Creates @class HdbextAsync.
   * @param hdbext object imported from `@sap/hdbext`.
   */
  constructor(hdbext: Hdbext) {
    this.loadProcedure = promisify(hdbext.loadProcedure);
    const createAsync = promisify(hdbext.createConnection);
    this.createConnection = async (hanaConfig: {}) => {
      const connection = await createAsync(hanaConfig);
      return new HanaClientAsync(this, connection);
    };
  }
}

export { HdbextAsync };
