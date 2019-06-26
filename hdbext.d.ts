
// tslint:disable:max-classes-per-file unified-signatures interface-name
declare module "@sap/hdbext" {
  import { Connection } from "@sap/hana-client";

  /**
   * Represents `@sap/hdbext` async wrapper.
   */
  class Hdbext {
    public createConnection(hanaConfig: {}, callback: (error: Error | null, connection: Connection) => void): void;
  }
}
