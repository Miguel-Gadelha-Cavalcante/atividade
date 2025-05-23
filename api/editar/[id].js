import mysql from "mysql2/promise";

export default async (req, res) => {
  const { id } = req.query;
  const { nome, login } = req.body;

  try {
    const connection = await mysql.createConnection({
      // ... mesma configuração do banco
    });

    await connection.query(
      "UPDATE seguranca_tbUsuarios SET nome = ?, login = ? WHERE usuario_id = ?",
      [nome, login, id]
    );

    res.status(200).json({
      success: true,
      message: "Cadastro atualizado",
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ success: false, error: "Erro na atualização" });
  }
};
