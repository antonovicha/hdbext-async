import { HanaClient } from '@sap/hana-client';
import { promisify } from 'util';

class HanaClientAsync {
  public exec: <T>(sql: string) => Promise<T>;
  public commit: () => Promise<void>;
  public rollback: () => Promise<void>;

  //   var hdb = require('@sap/hana-client');
  //   client = hdb.createClient(options);
  //   req.db = client;
  constructor(client: HanaClient) {
    this.exec = promisify(client.exec);
    this.commit = promisify(client.commit);
    this.rollback = promisify(client.rollback);
  }
}

export { HanaClientAsync };
