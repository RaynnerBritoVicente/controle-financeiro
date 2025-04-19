import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";

const App = () => {
  const data = localStorage.getItem("transactions"); //Obtendo o item 'transactions' do armazenamento
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  ); // declarando e incluindo os dados obtidos na 'transactionsList'
  const [income, setIncome] = useState(0); // declarando o income(entradas)
  const [expense, setExpense] = useState(0); // declarando o expense(saídas/despesas)
  const [total, setTotal] = useState(0); // declarando o Total

  //UseEffect com dependência na lista de transações
  useEffect(() => {
    // função para filtrar e somar o valor das saídas/despesas lançadas.
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));
    
    // função para filtrar e somar o valor das Entradas lançadas.
    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2); //Soma todas as Saídas/Despesas
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2); //Soma todas as Entradas

    const total = Math.abs(income - expense).toFixed(2); //Calcula o Total

    setIncome(`R$ ${income}`); //Define o total de Entradas
    setExpense(`R$ ${expense}`); //Define o total de Saídas/Despesas
    setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`); //Define o saldo total
  }, [transactionsList]);

  //Função para lidar com as novas adições a lista de transações
  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];

    setTransactionsList(newArrayTransactions);

    localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
  };

  //Estrutura principal
  return (
    <>
      <Header />
      <Form
        handleAdd={handleAdd}
        transactionsList={transactionsList}
        setTransactionsList={setTransactionsList}
      />
      <Resume income={income} expense={expense} total={total} />
      <GlobalStyle />
    </>
  );
};

export default App;