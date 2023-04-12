"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = require("knex");
class BaseDatabase {
}
BaseDatabase.connection = (0, knex_1.knex)({
    client: "sqlite3",
    connection: {
        filename: "./labeddit.db"
    },
    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 1,
        afterCreate: (conn, cb) => {
            conn.run("PRAGMA foreign_keys = ON", cb);
        }
    }
});
exports.BaseDatabase = BaseDatabase;
//# sourceMappingURL=BaseDatabase.js.map