"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ingressos_model_1 = __importDefault(require("../database/models/ingressos.model"));
class IngressosController {
    // Listar todos por tenant_id
    async List(req, res) {
        try {
            const header = req.headers;
            const usertoken = header.authorization?.replace("Bearer ", '');
            if (!usertoken) {
                res.status(403).json({ success: false, message: "Token invalido ou acesso proibido!" });
                return;
            }
            const token = jsonwebtoken_1.default.decode(usertoken);
            const { tenant: { tenant_id } } = token;
            const result = await ingressos_model_1.default.GetAll(tenant_id);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Erro ao obter os dados" + error?.message || error });
            console.log(error);
        }
    }
    ///Pesquisa por ID
    async getIngressosById(req, res) {
        try {
            const { id } = req.params;
            const resullt = await ingressos_model_1.default.GetById(Number(id));
            res.status(200).json({ success: true, resullt: resullt });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Erro ao obter os dados: " + error?.message || error });
        }
    }
    ////Pesuisar por QRCode 
    async SearchQrCode(req, res) {
        try {
            //verificacao do token do usuario 
            const header = req.headers;
            const usertoken = header.authorization?.replace("Bearer ", '');
            if (!usertoken) {
                res.status(403).json({ error: "Token invalido ou acesso proibido!" });
                return;
            }
            //decodificando o token do usuario 
            const token = jsonwebtoken_1.default.decode(usertoken);
            const { tenant: { tenant_id } } = token;
            const { qr_code } = req.body;
            const result = await ingressos_model_1.default.GetbyQrCode(qr_code, tenant_id);
            ///enviando a resposta 
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Erro ao obter os dados: " + error?.message || error });
            console.log(error);
        }
    }
    async UpdateStatus(req, res) {
        try {
            const { status, id } = req.body;
            const result = await ingressos_model_1.default.UpdateStatus(Number(id), String(status));
            const { success, message } = result;
            if (!success === true) {
                res.status(404).json({ success: success, message: message });
                return;
            }
            res.status(200).json({ success: success, message: message });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Erro ao atualizar os dados: " + error?.message || error });
            console.log(error);
        }
    }
}
exports.default = new IngressosController();
//# sourceMappingURL=ingressos.controller.js.map