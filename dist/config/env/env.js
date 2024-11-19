"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppEnv = {
    port: Number(process.env.PORT),
    dbHost: String(process.env.DB_HOST),
    dbUsername: String(process.env.DB_USERNAME),
    dbPort: String(process.env.DATABASE_PORT),
    dbName: String(process.env.DB_NAME),
    imageUrl: String(process.env.IMAGE_URL),
    loginApi: String(process.env.LOGIN_API),
    secretKey: String(process.env.SEVRET_KEY),
    dbPassword: String(process.env.DB_PASSWORD)
};
//# sourceMappingURL=env.js.map