// api/listar.js
import mysql from "mysql2/promise";

export default async (req, res) => {
  const dbConfig = {
    host: "syvus.h.filess.io",
    user: "cadlog_piethypipe",
    password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
    database: "cadlog_piethypipe",
    port: 3307,
    ssl: { rejectUnauthorized: false },
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(`
      SELECT usuario_id, nome, login, atualizado_em 
      FROM seguranca_tbUsuarios 
      ORDER BY usuario_id DESC
    `);

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ success: false, error: "Erro no servidor" });
  }
};
