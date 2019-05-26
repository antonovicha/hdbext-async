import { Statement } from "@sap/hana-client";
import { promisify } from "util";

class StatementAsync {
  public exec: <TResults>(params?: Array<string | number | boolean>, options?: {}) => Promise<TResults>;

  constructor(stmt: Statement) {
    // Complicated topic: https://github.com/Microsoft/TypeScript/issues/26048
    // Since I knew that exec have exactly that signature I used 'as any'.
    this.exec = promisify(stmt.exec) as any;
  }
}

export { StatementAsync };
