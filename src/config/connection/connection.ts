import mysql from "mysql";
import { AppEnv } from "../env/env";
const conn = mysql.createConnection({
  port:Number(AppEnv.dbPort),
  host:AppEnv.dbHost,
  user:AppEnv.dbUsername,
  database:AppEnv.dbName,
  password:AppEnv.dbPassword,
  
})

conn.connect((err)=>{
  if (err) {
    console.log("Erro ao conectar com o banco de dados: " + (err as Error).message );
    return;
  }

})
export default conn;