// api/login.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ message: "Método não permitido" });

  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ message: "Login e senha são obrigatórios." });
  }

  try {
    const db = await mysql.createConnection({
      host: "syvus.h.filess.io",
      port: 3307,
      user: "cadlog_piethypipe",
      password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
      database: "cadlog_piethypipe",
    });

    const [usuarios] = await db.execute(
      "SELECT nome FROM seguranca_tbUsuarios WHERE login = ? AND senha = ?",
      [login, senha]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const usuario = usuarios[0];
    return res
      .status(200)
      .json({ message: "Login bem-sucedido.", nome: usuario.nome });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
}
