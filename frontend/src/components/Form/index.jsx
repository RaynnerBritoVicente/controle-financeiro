import React, { useState } from "react";
import Grid from "../Grid";
import * as C from "./styles";

const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
  const [desc, setDesc] = useState(""); //declarando 'desc' para descrição da transação
  const [amount, setAmount] = useState(""); //declarando 'amount' para o valor da transação
  const [isExpense, setExpense] = useState(false); //declarando 'isExpense' para definir se é entrada ou saída
  const [date, setDate] = useState(null);

  const generateID = () => Math.round(Math.random() * 1000); //Função para gerar um id ao lançar uma transação

  function handleDateUpdate(e) {
    const dateValue = e.target.value;

    const [ano, mes, dia] = dateValue.split("-");

    const formatedDate = `${dia}-${mes}-${ano}`;

    setDate(formatedDate);
  }

  //Função para realizar o lançamento da transação
  const handleSave = () => {
    if (!desc || !amount) { //Verifica se a descrição ou valor foram informados
      alert("Informe a descrição e o valor!");
      return;
    } else if (amount < 1) { //verifica se o valor informado é positivo
      alert("O valor deve ser positivo!");
      return;
    }

    //criando o item da transação
    const transaction = {
      id: generateID(),
      desc: desc,
      amount: amount,
      expense: isExpense,
      date: date,
    };

    //utiliza a função para armazenar o item criado
    handleAdd(transaction);

    //limpa as caixas de input
    setDesc("");
    setAmount("");
  };


  //estrutura do Form
  return (
    <>
      <C.Container>
        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </C.InputContent>
        <C.InputContent>
          <C.Label>Valor</C.Label>
          <C.Input
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </C.InputContent>
        <C.InputContent>
          <C.Label>Data da Operação</C.Label>
          <C.Input
            type="date"
            onChange={(e) => handleDateUpdate(e)}
          />
        </C.InputContent>
        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setExpense(!isExpense)}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rExpenses"
            name="group1"
            onChange={() => setExpense(!isExpense)}
          />
          <C.Label htmlFor="rExpenses">Saída</C.Label>
        </C.RadioGroup>
        <C.Button onClick={handleSave}>Adicionar</C.Button>
      </C.Container>
      <Grid itens={transactionsList} setItens={setTransactionsList} />
    </>
  );
};

export default Form;