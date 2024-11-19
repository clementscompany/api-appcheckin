import conn from "../../config/connection/connection";

class IngressosModel {
  GetAll(tenant_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      conn.query(`
        SELECT ingressos.*
        FROM ingressos
        WHERE ingressos.tenant_id = ?
      `, [tenant_id], (err, data) => {
        if (err) {
          return reject({ succes:false,  message: "Erro ao obter os dados da tabela: " + (err as Error).message });
        }
        resolve(data);
      });
    });
  }

  GetById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      conn.query(`
        SELECT ingressos.* 
        FROM ingressos
        WHERE ingressos.id = ?
      `, [id], (err, data) => {
        if (err) {
          return reject({ success: false, message: "Erro ao obter os dados da tabela: " + err.message });
        }
        resolve(data);
      });
    });
  }

  GetbyQrCode(qr_code: string, tenant_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      conn.query(`
        SELECT ingressos.*, eventos.* FROM ingressos 
        INNER JOIN eventos ON eventos.id = ingressos.evento_id
        WHERE ingressos.qrcode = ? AND ingressos.tenant_id = ?
      `, [qr_code, tenant_id], (err, data) => {
        if (err) {
          return reject({ success: false, message: "Erro ao obter os dados da tabela: " + (err as Error).message });
        }
        resolve(data); 
      });
    });
  }
  
  UpdateStatus(id: number, status: string): Promise<{ success: boolean, message: string }> {
    return new Promise((resolve, reject) => {
      conn.query(`
        UPDATE ingressos SET status = ?  
        WHERE ingressos.id = ?
      `, [status, id], (err, data) => {
        if (err) {
          return reject({ success: false, message: "Erro ao atualizar o status: " + (err as Error).message });
        }
        if (!data || data.affectedRows === 0) {
          return resolve({ success: false, message: "Dados não encontrados e não atualizados" });
        }
        resolve({ success: true, message: "Status atualizado com sucesso" });
      });
    });
  }
  
}

export default new IngressosModel();