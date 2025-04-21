import React, { useState } from "react";
import Grid from "../Grid";
import * as C from "./styles";

const Form = () => {
  const [descricao, setDescricao] = useState(""); //declarando 'descricao' para descrição da transação
  const [valor, setValor] = useState(""); //declarando 'valor' para o valor da transação
  const [tipo, setTipo] = useState(false); //declarando 'tipo' para definir se é entrada(false) ou saída(true)

  const onSubmitForm = async (e) => {
    e.preventDefault(); //Previne a página de recarregar após um submit

    const data_transacao = document.getElementById("data").value; //obtem o valor da data!

    try {
      const body = { descricao, valor, tipo, data_transacao };
      const response = await fetch("http://localhost:5000/transac", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  //estrutura do Form
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <C.Container>
          <C.InputContent>
            <C.Label>Descrição</C.Label>
            <C.Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </C.InputContent>
          <C.InputContent>
            <C.Label>Valor</C.Label>
            <C.Input
              value={valor}
              type="number"
              onChange={(e) => setValor(e.target.value)}
            />
          </C.InputContent>
          <C.InputContent>
            <C.Label>Data da Operação</C.Label>
            <C.Input
              type="date"
              id="data"
            />
          </C.InputContent>
          <C.RadioGroup>
            <C.Input
              type="radio"
              id="rIncome"
              defaultChecked
              name="group1"
              onChange={() => setTipo(!tipo)}
            />
            <C.Label htmlFor="rIncome">Entrada</C.Label>
            <C.Input
              type="radio"
              id="rExpenses"
              name="group1"
              onChange={() => setTipo(!tipo)}
            />
            <C.Label htmlFor="rExpenses">Saída</C.Label>
          </C.RadioGroup>
          <C.Button type="submit" value="Adicionar" />
        </C.Container>
        <Grid/>
      </form>
    </>
  );
};

export default Form;