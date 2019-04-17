import { Statement } from '@sap/hana-client';
import { promisify } from 'util';

class StatementAsync {
  public exec: <TResults>(params?: any[] | null, options?: {} | null) => Promise<TResults>;

  constructor(stmt: Statement) {
    this.exec = promisify(stmt.exec);
  }
}

export { StatementAsync };
