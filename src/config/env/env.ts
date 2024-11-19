import dotenv from "dotenv";
import { Env } from "../../types/types";
dotenv.config();
export const AppEnv: Env = {
  port:Number(process.env.PORT),
  dbHost: String(process.env.DB_HOST),
  dbUsername: String(process.env.DB_USERNAME),
  dbPort: String(process.env.DATABASE_PORT),
  dbName: String(process.env.DB_NAME),
  imageUrl:String(process.env.IMAGE_URL),
  loginApi: String(process.env.LOGIN_API),
  secretKey: String(process.env.SEVRET_KEY),
  dbPassword:String(process.env.DB_PASSWORD)
}