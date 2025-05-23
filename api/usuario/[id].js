import mysql from "mysql2/promise";

export default async (req, res) => {
  const { id } = req.query;

  try {
    const connection = await mysql.createConnection({
      // ... mesma configuração do banco
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
