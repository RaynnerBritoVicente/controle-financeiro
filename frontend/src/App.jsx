import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";

const App = () => {

  const [transacoes, setTransacoes] = useState([]);
  const [entradas, setEntradas] = useState("");
  const [saidas, setSaidas] = useState("");
  const [total, setTotal] = useState("");

  //função de busca das transações
  const buscaTransacoes = async () => {
    try {

      const response = await fetch("http://localhost:5000/transac");
      const jsonData = await response.json();

      setTransacoes(jsonData);
    } catch (err) {
      console.error(err.mesage)
    }
  };

  useEffect(() => {
    buscaTransacoes();
      // função para filtrar e somar o valor das saídas/despesas lançadas.
      const montanteSaida = transacoes
        .filter((item) => item.tipo)
        .map((transac) => Number(transac.valor));
    
      // função para filtrar e somar o valor das Entradas lançadas.
      const montanteEntrada = transacoes
        .filter((item) => !item.tipo)
        .map((transac) => Number(transac.valor));

      const expense = montanteSaida.reduce((acc, cur) => acc + cur, 0).toFixed(2); //Soma todas as Saídas/Despesas
      const income = montanteEntrada.reduce((acc, cur) => acc + cur, 0).toFixed(2); //Soma todas as Entradas

      const total = Math.abs(income - expense).toFixed(2); //Calcula o Total

      setEntradas(`R$ ${income}`); //Define o total de Entradas
      setSaidas(`R$ ${expense}`); //Define o total de Saídas/Despesas
      setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`); //Define o saldo total
    });

  //Estrutura principal
  return (
    <>
      <div className="cointainer">
        <Header />
        <Resume entradas={entradas} saidas={saidas} total={total} /> { /*Informando os parametros de Entradas, Saidas e Total para o componente 'Resume'*/ } 
        <Form />
        <GlobalStyle />
      </div>
    </>
  );
};

export default App;