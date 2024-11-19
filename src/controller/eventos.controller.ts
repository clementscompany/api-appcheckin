import { Request, Response } from "express";
import eventosModel from "../database/models/eventos.model";
import jwt from "jsonwebtoken";
class EventosController {
  async List(req: Request, res: Response): Promise<void> {
    try {
      const header = req.headers;
      const usertoken: any = header.authorization?.replace("Bearer ", '');
      if (!usertoken) {
        res.status(403).json({ succes: false, message: "Token invalido ou acesso proibido!" });
        return;
      }
      const token = jwt.decode(usertoken);
      const { tenant: { tenant_id } }: any = token;

      const result: Promise<any> = await eventosModel.GetAll(tenant_id);
      res.status(200).json({ success:true, result: result })
    } catch (error: any) {
      res.status(500).json({ succes: false, message: "Erro ao obter os dados: " + error?.error || error })
      console.log(error);
    }
  }
  ///
}
export default new EventosController();