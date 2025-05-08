// api/register.js
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const db = await mysql.createConnection({
    host: "syvus.h.filess.io",
    user: "cadlog_piethypipe",
    password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
    database: "cadlog_piethypipe",
  });

  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (rows.length > 0) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  await db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    password,
  ]);
  res.status(200).json({ message: "Usuário cadastrado com sucesso" });
}
