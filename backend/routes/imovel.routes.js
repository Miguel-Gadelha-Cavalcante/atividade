const express = require("express");
const router = express.Router();

// Exemplo de rota
router.get("/", (req, res) => {
  res.json({ message: "Lista de imóveis" });
});

module.exports = router;
