// tslint:disable:max-classes-per-file unified-signatures interface-name

declare module "@sap/hdbext" {
  import { Connection } from "@sap/hana-client";

  namespace hdbext {
    interface ParamsMetadata {
      readonly PARAMETER_NAME: string,
      readonly DATA_TYPE_NAME: string,
      readonly PARAMETER_TYPE: string,
      readonly HAS_DEFAULT_VALUE: string,
      readonly IS_INPLACE_TYPE: string,
      readonly TABLE_TYPE_SCHEMA: string | null,
      readonly TABLE_TYPE_NAME: string | null,
    }

    interface ProcedureInfo {
      readonly schema: string | null;
      readonly name: string;
      readonly metadata: ReadonlyArray<ParamsMetadata>
    }

    type ProcedureFunctionCallback = (error: Error | null, ...parameters: SpParamResult[]) => void;

    type SpParam = string | number | boolean;
    type SpParamResultValue = string | number | null;
    type SpParamResult = {} | SpParamResultValue | SpParamResultValue[];

    /**
     * Returned by `Hdbext.loadProcedure` callback.
     */
    export interface ProcedureFunction {
      (parameters: {[key: string]: SpParam}, callback: ProcedureFunctionCallback): void;
      /**
       * @parameters `ProcedureFunctionCallbackWithError` must be last element of array.
       * Commented out because it causing a lot of type inference issues.
       * TODO: find a solution.
       */
      // (...parameters: Array<SpParam | ProcedureFunctionCallbackWithError>): void;
      (parameters: SpParam[], callback: ProcedureFunctionCallback): void;
      paramsMetadata: ParamsMetadata[];
    }

    /**
   * Represents `@sap/hdbext` async wrapper.
   */
    interface hdbextObj {
      createConnection(hanaConfig: {}, callback: (error: Error | null, connection: Connection) => void): void;
      loadProcedure<TResult>(
        connection: Connection, schemaName: string | null, procedureName: string,
        callback: (error: Error | null, procedureFunction: ProcedureFunction | undefined) => void): void;
    }
  }

  const hdbext: hdbext.hdbextObj;

  export = hdbext;
}
