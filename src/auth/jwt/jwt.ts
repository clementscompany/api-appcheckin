import jwt from "jsonwebtoken";
import { AppEnv } from "../../config/env/env";
class UserToken {
  Generete(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const key: string = AppEnv.secretKey;
      jwt.sign(payload, key, { expiresIn: '7d' }, (err, token) => {
        if (err) {
          return reject({ error: "Erro ao gerar o token: " + (err as Error).message })
        }
        resolve({ token: token })
      });
    })
  }
}
export default new UserToken();