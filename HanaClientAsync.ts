import { HanaClient } from '@sap/hana-client';
import { promisify } from 'util';
import { StatementAsync } from './StatementAsync';

class HanaClientAsync {
  public exec: <T>(sql: string) => Promise<T>;
  public commit: () => Promise<void>;
  public rollback: () => Promise<void>;
  public prepare: <T>(sql: string) => Promise<StatementAsync<T>>;

  //   var hdb = require('@sap/hana-client');
  //   client = hdb.createClient(options);
  //   req.db = client;
  constructor(client: HanaClient) {
    this.exec = promisify(client.exec);
    this.commit = promisify(client.commit);
    this.rollback = promisify(client.rollback);
    const prepareAsync = promisify(client.prepare);
    this.prepare = async <T>(sql: string) => {
      const stmt = await prepareAsync(sql);
      return new StatementAsync<T>(stmt);
    };
  }
}

export { HanaClientAsync };
