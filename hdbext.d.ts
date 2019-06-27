// tslint:disable:max-classes-per-file unified-signatures interface-name
declare module "@sap/hdbext" {
  import { Connection } from "@sap/hana-client";

  interface ProcedureInfo {
    readonly schema: string | null;
    readonly name: string;
    readonly metadata: [{
      PARAMETER_NAME: string,
      DATA_TYPE_NAME: string,
      PARAMETER_TYPE: string,
      HAS_DEFAULT_VALUE: string,
      IS_INPLACE_TYPE: string,
      TABLE_TYPE_SCHEMA: string | null,
      TABLE_TYPE_NAME: string | null,
    }]
  }

  /**
   * Helper type supposed to be base for `ProcedureFunctionCallbackWithError` and `ProcedureFunctionResult`.
   */
  // TODO: find out type of dummyRows & tablesRows.
  type ProcedureFunctionCallback = (parameters: ProcedureFunctionParams, dummyRows: any, tablesRows: any) => void;
  /**
   * Returned by promisified `ProcedureFunction` as result.
   */
  // TODO: find out better way to infer object from function params.
  type ProcedureFunctionResult =
    ProcedureFunctionCallback extends (parameters: infer P, dummyRows: infer DR, tablesRows: infer TR) => infer R ?
    { parameters: P, dummyRows: DR, tablesRows: TR } :
    never;

  /**
   * `ProcedureFunction` callback.
   */
  type ProcedureFunctionCallbackWithError = ProcedureFunctionCallback extends (...p: infer P) => infer R ?
                                            (error: Error | null, ...p: P) => R :
                                            never;

  /**
   * Returned by `Hdbext.loadProcedure` callback.
   */
  type ProcedureFunction = (parameters: ProcedureFunctionParams, callback: ProcedureFunctionCallbackWithError) => void;

  type ProcedureFunctionParams = {} | [];

  /**
   * Represents `@sap/hdbext` async wrapper.
   */
  class Hdbext {
    public createConnection(hanaConfig: {}, callback: (error: Error | null, connection: Connection) => void): void;
    public loadProcedure(connection: Connection, schemaName: string | null, procedureName: string,
                         callback: (error: Error | null, procedureFunction: ProcedureFunction) => void): void;
  }
}
