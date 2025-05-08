// api/register.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, login, senha } = req.body;

  if (!nome || !login || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    const db = await mysql.createConnection({
      host: "syvus.h.filess.io",
      port: 3307,
      user: "cadlog_piethypipe",
      password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
      database: "cadlog_piethypipe",
    });

    // Verifica se já existe login com mesmo email
    const [existe] = await db.execute(
      "SELECT * FROM seguranca_tbUsuarios WHERE login = ?",
      [login]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: "Login já cadastrado." });
    }

    // Insere novo usuário
    await db.execute(
      "INSERT INTO seguranca_tbUsuarios (nome, login, senha, atualizado_em) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
      [nome, login, senha]
    );

    return res.status(200).json({ message: "Cadastro realizado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
}
