const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();

// Configuração do Banco de Dados (use suas credenciais)
const dbConfig = {
  host: "syvus.h.filess.io",
  user: "cadlog_piethypipe",
  password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
  database: "cadlog_piethypipe",
  port: 3307,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

// Middlewares
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://atividade-inky.vercel.app/"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Rota de Cadastro Simples
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const [result] = await pool.query(
      `INSERT INTO seguranca_tbUsuarios 
            (nome, login, senha, atualizado_em) 
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [nome, email, senha]
    );
    res
      .status(201)
      .json({ message: "Cadastro realizado!", id: result.insertId });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: "Erro interno" });
  }
});

// Rota de Teste
app.get("/listar", async (req, res) => {
  try {
    const [registros] = await pool.query(
      `SELECT usuario_id, nome, login, atualizado_em 
          FROM seguranca_tbUsuarios 
          ORDER BY usuario_id DESC`
    );

    res.json({
      success: true,
      data: registros,
    });
  } catch (error) {
    console.error("Erro na listagem:", error);
    res.status(500).json({
      success: false,
      error: "Erro ao buscar registros",
    });
  }
});
app.get("/", (req, res) => {
  res.send("Servidor operacional");
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
