"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../config/connection/connection"));
class eventosModel {
    GetAll(tenant_id) {
        return new Promise((resolve, reject) => {
            connection_1.default.query(`
        SELECT eventos.*, tenants.* 
        FROM eventos
        INNER JOIN tenants
        ON tenants.tenant_id = eventos.tenant_id
        WHERE eventos.tenant_id = ?`, [tenant_id], (err, data) => {
                if (err) {
                    return reject({ error: "Erro ao obter os dados da tabela: " + err.message });
                }
                resolve(data);
            });
        });
    }
}
exports.default = new eventosModel();
//# sourceMappingURL=eventos.model.js.map