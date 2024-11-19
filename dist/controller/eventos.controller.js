"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventos_model_1 = __importDefault(require("../database/models/eventos.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class EventosController {
    async List(req, res) {
        try {
            const header = req.headers;
            const usertoken = header.authorization?.replace("Bearer ", '');
            if (!usertoken) {
                res.status(403).json({ succes: false, message: "Token invalido ou acesso proibido!" });
                return;
            }
            const token = jsonwebtoken_1.default.decode(usertoken);
            const { tenant: { tenant_id } } = token;
            const result = await eventos_model_1.default.GetAll(tenant_id);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(500).json({ succes: false, message: "Erro ao obter os dados: " + error?.error || error });
            console.log(error);
        }
    }
}
exports.default = new EventosController();
//# sourceMappingURL=eventos.controller.js.map