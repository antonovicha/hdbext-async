import { Hdbext } from "@sap/hdbext";
import { promisify } from "util";

import { HanaClientAsync } from "ConnectionAsync";

class HdbextAsync {
  public readonly createConnection: (hanaConfig: {}) => Promise<HanaClientAsync>;

  /**
   * Creates @class HdbextAsync.
   * @param hdbext object imported from `@sap/hdbext`.
   */
  constructor(hdbext: Hdbext) {
    const createAsync = promisify(hdbext.createConnection);
    this.createConnection = async (hanaConfig: {}) => {
      const connection = await createAsync(hanaConfig);
      return new HanaClientAsync(connection);
    };
  }
}

export { HdbextAsync };
