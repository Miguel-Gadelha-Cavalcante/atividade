import mysql from "mysql2/promise";

export default async (req, res) => {
  // Forçar retorno como JSON
  res.setHeader("Content-Type", "application/json");

  try {
    const dbConfig = {
      host: "syvus.h.filess.io",
      user: "cadlog_piethypipe",
      password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
      database: "cadlog_piethypipe",
      port: 3307,
      ssl: { rejectUnauthorized: false },
    };

    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(`
      SELECT usuario_id, nome, login, atualizado_em 
      FROM seguranca_tbUsuarios 
      ORDER BY usuario_id DESC
    `);

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Erro detalhado:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
