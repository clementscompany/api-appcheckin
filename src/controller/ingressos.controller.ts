import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import ingressosModel from "../database/models/ingressos.model";
class IngressosController {
  // Listar todos por tenant_id
  async List(req: Request, res: Response): Promise<void> {
    try {
      const header = req.headers;
      const usertoken: any = header.authorization?.replace("Bearer ", '');
      if (!usertoken) {
        res.status(403).json({ success: false, message: "Token invalido ou acesso proibido!" });
        return;
      }
      const token = jwt.decode(usertoken);
      const { tenant: { tenant_id } }: any = token;
      const result = await ingressosModel.GetAll(tenant_id);
      res.status(200).json({ success: true, result: result })
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Erro ao obter os dados" + error?.message || error })
      console.log(error);
    }
  }

  ///Pesquisa por ID
  async getIngressosById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resullt: Promise<object> = await ingressosModel.GetById(Number(id));
      res.status(200).json({ success:true, resullt: resullt });
    } catch (error: any) {
      res.status(500).json({ success:false, message: "Erro ao obter os dados: " + error?.message || error })
    }
  }

  ////Pesuisar por QRCode 
  async SearchQrCode(req: Request, res: Response): Promise<void> {
    try {
      //verificacao do token do usuario 
      const header = req.headers;
      const usertoken: any = header.authorization?.replace("Bearer ", '');
      if (!usertoken) {
        res.status(403).json({ error: "Token invalido ou acesso proibido!" });
        return;
      }
      //decodificando o token do usuario 
      const token = jwt.decode(usertoken);
      const { tenant: { tenant_id } }: any = token;
      const { qr_code } = req.body;
      const result: any = await ingressosModel.GetbyQrCode(qr_code, tenant_id);
      ///enviando a resposta 
      res.status(200).json({ success: true, result: result })
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Erro ao obter os dados: " + error?.message || error });
      console.log(error);
    }
  }

  async UpdateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status, id } = req.body;
      const result = await ingressosModel.UpdateStatus(Number(id), String(status));
      const { success, message } = result;
      if (!success === true) {
        res.status(404).json({ success: success, message: message })
        return;
      }
      res.status(200).json({ success: success, message: message })
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Erro ao atualizar os dados: " + error?.message || error });
      console.log(error);
    }
  }

}
export default new IngressosController();