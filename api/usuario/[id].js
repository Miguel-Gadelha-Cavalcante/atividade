import mysql from "mysql2/promise";

export default async (req, res) => {
  const { id } = req.query;

  try {
    const connection = await mysql.createConnection({
      host: "syvus.h.filess.io",
      user: "cadlog_piethypipe",
      password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
      database: "cadlog_piethypipe",
      port: 3307,
      ssl: { rejectUnauthorized: false },
    });

    const [rows] = await connection.query(
      "SELECT * FROM seguranca_tbUsuarios WHERE usuario_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Usuário não encontrado" });
    }

    res.status(200).json({
      success: true,
      usuario: rows[0],
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ success: false, error: "Erro no servidor" });
  }
};
