"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../config/connection/connection"));
class tenantsModel {
    GetAll(tenant_id) {
        return new Promise((resolve, reject) => {
            connection_1.default.query("SELECT tenants.* FROM tenants WHERE tenants.tenant_id = ? ", [tenant_id], (err, data) => {
                if (err) {
                    return reject({ error: "Erro ao obter os dados da tabela: " + err.message });
                }
                resolve(data);
            });
        });
    }
    GetById(id) {
        return new Promise((resolve, reject) => {
            connection_1.default.query("SELECT tenants.* FROM tenants WHERE tenants.id = ? ", [id], (err, data) => {
                if (err) {
                    return reject({ error: "Erro ao obter os dados da tabela: " + err.message });
                }
                resolve(data);
            });
        });
    }
}
exports.default = new tenantsModel();
//# sourceMappingURL=tenants.model.js.map