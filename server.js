// server.js
require("dotenv").config();
const express = require("express");
const db = require("./backend/config/db");

const app = express();

// Middleware
app.use(express.json());

// Rota de teste para verificar a conexão e buscar dados
app.get("/api/teste", (req, res) => {
  db.query("SELECT * FROM tbPessoas", (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados:", err);
      return res.status(500).json({ error: "Erro no banco de dados" });
    }
    res.json({ message: "Conexão OK", usuarios: results });
  });
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  }
  console.log("Conectado ao banco de dados MySQL!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
