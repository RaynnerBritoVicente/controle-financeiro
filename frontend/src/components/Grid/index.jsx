import React, { useEffect, useState } from "react";
import EditTransac from "../EditTransac";
import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
  FaEdit,
} from "react-icons/fa"; //importando os icones do react-icons

const Grid = () => {
  
  const [transacoes, setTransacoes] = useState([]); //Receberá todas as transações do banco de dados
  //Função de Excluir uma transação
  const deletaTransacao = async (id) => {
    try {
      const deletarTransacao = await fetch(`http://localhost:5000/transac/${id}`, {
        method: "DELETE"
      });

      //Filtra a lista de Transações para exibir somente as que permanecerem, sem carregar a página
      setTransacoes(transacoes.filter(transac => transac.id !== id)); 
    } catch (err) {
      console.error(err.message); //retorna a mensagem de erro.
    }
  }

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

  //Atualisa a lista de transações a cada novo "POST"
  useEffect(() => {
    buscaTransacoes();
  },[])

  //Estruturando a tabela e incluindo todas as linhas obtidas da base de dados
  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th width={30}>Descrição</C.Th>
          <C.Th width={30}>Valor</C.Th>
          <C.Th width={20}>Data</C.Th>
          <C.Th width={10}>Tipo</C.Th>
          <C.Th width={10}>Editar</C.Th>
          <C.Th width={10}>Excluir</C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody alignCenter>
        {transacoes.map(transac => (
          <tr key={transac.id}>
            <td>{transac.descricao}</td>
            <td>{transac.valor}</td>
            <td>{transac.data_formatada}</td>
            <td>{transac.tipo ? (
                      <FaRegArrowAltCircleDown color="red" />
                    ) : (
                      <FaRegArrowAltCircleUp color="green" />
            )}</td>
            <td><EditTransac transac={transac} /></td>
            <td><button className="btn btn-danger"onClick={() => deletaTransacao(transac.id)}><FaTrash cursor="pointer"/></button></td>
          </tr>
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;