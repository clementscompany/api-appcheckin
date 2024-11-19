"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const env_1 = require("../env/env");
const conn = mysql_1.default.createConnection({
    port: Number(env_1.AppEnv.dbPort),
    host: env_1.AppEnv.dbHost,
    user: env_1.AppEnv.dbUsername,
    database: env_1.AppEnv.dbName,
    password: env_1.AppEnv.dbPassword,
});
conn.connect((err) => {
    if (err) {
        console.log("Erro ao conectar com o banco de dados: " + err.message);
        return;
    }
});
exports.default = conn;
//# sourceMappingURL=connection.js.map