# Async wrapper around hana-client connection and statement classes

Supposed to be used in express nodejs applications.

Work in progress. Versions published are alpha still.

## Usage

Simple example:

```typescript
import { HdbextAsync } from "@antonovicha/hdbext-async";
import * as hdbext from "@sap/hdbext";

hdbextAsync = new HdbextAsync(hdbext);
const connection = await hdbextAsync.createConnection(hanaOptions.hana);
const result1 = await connection.exec(sql, params, options);

const procedureFunction = await connection.loadProcedure(schema, procedureName);
const result2 = await procedureFunction(param1, param2);

connection.close();

```
