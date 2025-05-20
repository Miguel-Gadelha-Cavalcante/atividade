import mysql from "mysql2/promise";

export default async (req, res) => {
  // Configuração CORS completa
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ success: false, error: "Método não permitido" });
  }

  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, error: "IDs inválidos" });
  }

  try {
    const connection = await mysql.createConnection({
      host: "syvus.h.filess.io",
      user: "cadlog_piethypipe",
      password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
      database: "cadlog_piethypipe",
      port: 3307,
      ssl: { rejectUnauthorized: false },
    });

    await connection.execute(
      `DELETE FROM seguranca_tbUsuarios 
            WHERE usuario_id IN (${ids.map(() => "?").join(",")})`,
      ids
    );

    return res.status(200).json({
      success: true,
      deletedCount: ids.length,
    });
  } catch (error) {
    console.error("Erro na exclusão:", error);
    return res.status(500).json({
      success: false,
      error: "Erro ao excluir registros",
    });
  }
};
