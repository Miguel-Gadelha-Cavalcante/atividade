const mysql = require("mysql2/promise");

const dbConfig = {
  host: "syvus.h.filess.io",
  user: "cadlog_piethypipe",
  password: "1add0f1ff1768b23f749db061579f51e4edd4d76",
  database: "cadlog_piethypipe",
  port: 3307, // Porta explícita, se der merda, troque a porta pela antiga com Ctrl+z
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
