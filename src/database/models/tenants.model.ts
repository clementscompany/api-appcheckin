import conn from "../../config/connection/connection";

class tenantsModel {
  GetAll(tenant_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      conn.query("SELECT tenants.* FROM tenants WHERE tenants.tenant_id = ? ", 
        [tenant_id],
        (err, data) => {
        if (err) {
          return reject({ error: "Erro ao obter os dados da tabela: " + (err as Error).message })
        }
        resolve(data);
      })
    })
  }

  GetById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      conn.query("SELECT tenants.* FROM tenants WHERE tenants.id = ? ", 
        [id],
        (err, data) => {
        if (err) {
          return reject({ error: "Erro ao obter os dados da tabela: " + (err as Error).message })
        }
        resolve(data);
      })
    })
  }
}
export default new tenantsModel();