import { HanaClient } from '@sap/hana-client';
import { promisify } from 'util';

class DbConnection {
  private client: HanaClient;
  //   var hdb = require('@sap/hana-client');
  //   client = hdb.createClient(options);
  //   req.db = client;
  constructor(client: HanaClient) {
    this.client = client;
  }
}
