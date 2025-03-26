const mysql = require("mysql2/promise");

const dbConfig = {
  host: "3tjuk.h.filess.io",
  user: "inventarioImoveisNovos_goosebook",
  password: "a2fc6313261f8fbcc16e5b2b7f1f024f1d3a99b5",
  database: "inventarioImoveisNovos_goosebook",
  port: 61002, // Porta explícita
  ssl: {
    rejectUnauthorized: false, // Geralmente necessário em serviços cloud
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Testar conexão
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Conexão bem-sucedida ao banco de dados!");
    await connection.ping();
    console.log("Ping no banco bem-sucedido!");
  } catch (err) {
    console.error("Erro de conexão:", err);
  } finally {
    if (connection) connection.release();
  }
}

testConnection();

module.exports = pool;
