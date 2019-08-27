// tslint:disable:max-classes-per-file unified-signatures interface-name
import { Connection } from "@sap/hana-client";

declare namespace hdbext {
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

  type SpParam = string | number | boolean;
  export interface ProcedureFunction {
    (parameters: {[key: string]: SpParam}, callback: ProcedureFunctionCallbackWithError): Promise<ProcedureFunctionResult>;
    /**
     * @parameters `ProcedureFunctionCallbackWithError` must be last element of array.
     * Commented out because it causing a lot of type inference issues.
     * TODO: find a solution.
     */
    // (...parameters: Array<SpParam | ProcedureFunctionCallbackWithError>): void;
    (parameters: SpParam[], callback: ProcedureFunctionCallbackWithError): Promise<ProcedureFunctionResult>;
  }

  /**
   * Returned by `Hdbext.loadProcedure` callback.
   */
  // type ProcedureFunction = (parameters: ProcedureFunctionParams, callback: ProcedureFunctionCallbackWithError) => void;

  type ProcedureFunctionParams = {[key: string]: SpParam} | SpParam[];

  /**
 * Represents `@sap/hdbext` async wrapper.
 */
  interface hdbextObj {
    createConnection(hanaConfig: {}, callback: (error: Error | null, connection: Connection) => void): void;
    loadProcedure(connection: Connection, schemaName: string | null, procedureName: string,
                  callback: (error: Error | null, procedureFunction: ProcedureFunction | undefined) => void): void;
  }
}

declare const hdbext: hdbext.hdbextObj;

export = hdbext;
