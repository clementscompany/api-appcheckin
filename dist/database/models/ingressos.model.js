"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../config/connection/connection"));
class IngressosModel {
    GetAll(tenant_id) {
        return new Promise((resolve, reject) => {
            connection_1.default.query(`
        SELECT ingressos.*
        FROM ingressos
        WHERE ingressos.tenant_id = ?
      `, [tenant_id], (err, data) => {
                if (err) {
                    return reject({ succes: false, message: "Erro ao obter os dados da tabela: " + err.message });
                }
                resolve(data);
            });
        });
    }
    GetById(id) {
        return new Promise((resolve, reject) => {
            connection_1.default.query(`
        SELECT ingressos.* 
        FROM ingressos
        WHERE ingressos.id = ?
      `, [id], (err, data) => {
                if (err) {
                    return reject({ success: false, message: "Erro ao obter os dados da tabela: " + err.message });
                }
                resolve(data);
            });
        });
    }
    GetbyQrCode(qr_code, tenant_id) {
        return new Promise((resolve, reject) => {
            connection_1.default.query(`
        SELECT ingressos.*, eventos.* FROM ingressos 
        INNER JOIN eventos ON eventos.id = ingressos.evento_id
        WHERE ingressos.qrcode = ? AND ingressos.tenant_id = ?
      `, [qr_code, tenant_id], (err, data) => {
                if (err) {
                    return reject({ success: false, message: "Erro ao obter os dados da tabela: " + err.message });
                }
                resolve(data);
            });
        });
    }
    UpdateStatus(id, status) {
        return new Promise((resolve, reject) => {
            connection_1.default.query(`
        UPDATE ingressos SET status = ?  
        WHERE ingressos.id = ?
      `, [status, id], (err, data) => {
                if (err) {
                    return reject({ success: false, message: "Erro ao atualizar o status: " + err.message });
                }
                if (!data || data.affectedRows === 0) {
                    return resolve({ success: false, message: "Dados não encontrados e não atualizados" });
                }
                resolve({ success: true, message: "Status atualizado com sucesso" });
            });
        });
    }
}
exports.default = new IngressosModel();
//# sourceMappingURL=ingressos.model.js.map