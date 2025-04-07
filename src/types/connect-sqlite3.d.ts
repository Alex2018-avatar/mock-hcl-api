// src/types/connect-sqlite3.d.ts
import session from "express-session";

declare module "connect-sqlite3" {
  interface SQLiteStoreOptions {
    db?: string;
    dir?: string;
    concurrentDB?: boolean;
    table?: string;
  }

  class SQLiteStore extends session.Store {
    constructor(options: SQLiteStoreOptions);
  }

  function SQLiteStoreFactory(session: typeof session): typeof SQLiteStore;

  export = SQLiteStoreFactory;
}
