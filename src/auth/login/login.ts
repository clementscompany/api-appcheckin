import { Request, Response } from "express";
import { AppEnv } from "../../config/env/env";
import UserToken from "../jwt/jwt";


export default async function Login(req: Request, res: Response): Promise<void> {
  try {
    const { email, senha } = req.body;
    const sendData = await fetch(AppEnv.loginApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });
    if (!sendData.ok) {
      res.status(sendData.status).json({
        error: "Erro ao efetuar o login: " + sendData.statusText,
      });
      return;
    }
    const result: any = await sendData.json();
    const {
      success,
      error
    } = result;

      
    if (success === false) {
      res.status(sendData.status).json({ success: false, message: error });
      return;
    }

    const {
      admin: { id, admin_id, nome, celular, funcao },
      tenant: { tenant_id, logotipo, rodape_corfundo, rodape_corText, rodape_corlink },
    } = result;
    
    const payload = {
      admin: { id: id, admin_id: admin_id, nome: nome, celular: celular, funcao: funcao },
      tenant: { tenant_id: tenant_id, logotipo: AppEnv.imageUrl + logotipo, rodape_corfundo: rodape_corfundo, rodape_corText: rodape_corText, rodape_corlink: rodape_corlink }
    };
    const token: { token: string } = await UserToken.Generete(payload);

    res.status(200).json({ success: true, message: "Credenciais confirmadas com sucesso!", token: token })
    res.status(200).json({
      message: "Login realizado com sucesso",
      user: { id, admin_id, nome, celular, funcao },
      tenant: { tenant_id, logotipo, rodape_corfundo, rodape_corText, rodape_corlink },
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login: " + (error as Error).message });
  }
}
