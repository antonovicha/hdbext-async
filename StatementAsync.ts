import { Statement } from '@sap/hana-client';
import { promisify } from 'util';

class StatementAsync<T> {
  public exec: (params: any[]) => Promise<T>;

  constructor(stmt: Statement) {
    this.exec = promisify<any[], T>(stmt.exec);
  }
}

export { StatementAsync };
