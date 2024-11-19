import conn from "../../config/connection/connection";
class eventosModel {
  GetAll(tenant_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      conn.query(`
        SELECT eventos.*, tenants.* 
        FROM eventos
        INNER JOIN tenants
        ON tenants.tenant_id = eventos.tenant_id
        WHERE eventos.tenant_id = ?`, [tenant_id], (err, data) => {
        if (err) {
          return reject({ error: "Erro ao obter os dados da tabela: " + (err as Error).message });
        }
        resolve(data);
      })
    })
  }
}
export default new eventosModel();