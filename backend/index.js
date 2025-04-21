const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//Criar uma transalção

app.post("/transac", async (req, res) => {
   try {
      const { descricao, valor, tipo, data_transacao } = req.body;
      const novaTransacao = await pool.query(
         "INSERT INTO transacoes (descricao, valor, tipo, data_transacao) VALUES ($1, $2, $3, $4) RETURNING *",
         [descricao, valor, tipo, data_transacao]
      );
     res.json(novaTransacao.rows[0]);
   } catch (err) {
       console.error(err.message);
   } 
});

//Obter todas as transações

app.get("/transac", async (req, res) => {
  try {
    const todasTransacoes = await pool.query(
      "SELECT id, descricao, valor, tipo, TO_CHAR(data_transacao, 'DD-MM-YYYY') AS data_formatada FROM transacoes;"
    );
    res.json(todasTransacoes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Obter uma transação

app.get("/transac/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transacao = await pool.query(
      "SELECT * FROM transacoes WHERE id = $1",
      [id]
    );
    res.json(transacao.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Atualizar uma transação

app.put("/transac/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { valor } = req.body;
    const atualizaTransacao = await pool.query(
      "UPDATE transacoes SET valor = $1 WHERE id = $2;",
      [valor ,id]
    );
    res.json("transações foi atualizada!");
  } catch (err) {
    console.error(err.message);
  }
});

//Deletar uma transação

app.delete("/transac/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletaTransacao = await pool.query(
      "DELETE FROM transacoes WHERE id = $1",
      [id]
    );
    res.json("Transação deletada!");
  } catch (err) {
    console.error(err.message);
  }
});


app.listen(5000, () => {
    console.log("servidor está rodando na porta 5000");
});