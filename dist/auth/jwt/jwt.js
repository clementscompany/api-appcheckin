"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env/env");
class UserToken {
    Generete(payload) {
        return new Promise((resolve, reject) => {
            const key = env_1.AppEnv.secretKey;
            jsonwebtoken_1.default.sign(payload, key, { expiresIn: '7d' }, (err, token) => {
                if (err) {
                    return reject({ error: "Erro ao gerar o token: " + err.message });
                }
                resolve({ token: token });
            });
        });
    }
}
exports.default = new UserToken();
//# sourceMappingURL=jwt.js.map