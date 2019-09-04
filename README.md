# Async wrapper around hana-client connection and statement classes

Supposed to be used in express nodejs applications.

Work in progress. Versions published are alpha still.

## Usage

```bash
npm install @antonovicha/hdbext-async
```

### hdbext & hana-client typings
Inside of you `tsconfig.json` file include `@sap/hdbext` and `@sap/hana-client` typings provided by this package:

```json
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "typeRoots": [
      ...
      "./node_modules/@antonovicha/hdbext-async/dist/@types/@sap",
      "./node_modules/@types",
      ...
    ],
  }
}
```

### Simple code example:

```typescript
import { HdbextAsync } from "@antonovicha/hdbext-async";
import * as hdbext from "@sap/hdbext";

hdbextAsync = new HdbextAsync(hdbext);
const connection = await hdbextAsync.createConnection(hanaOptions.hana);
const result1 = await connection.exec(sql, params, options);

const procedureFunction = await connection.loadProcedure(schema, procedureName);
const result2 = await procedureFunction([param1, param2]);
const result3 = await procedureFunction({ Param1: "something", Param2: 42 });

connection.close();

```
