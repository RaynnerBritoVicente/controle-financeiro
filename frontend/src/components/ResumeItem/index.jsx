import React from "react";
import * as C from "./styles"; //importando os componentes do arquivo 'styles'

//Estrutura do ResumeItem (Recebendo os parâmetros informados no Resume)
//Declarando o título dos cards, valor atual e o Icone representando a operação
const ResumeItem = ({ title, Icon, value }) => {
  return (
    <C.Container>
      <C.Header>
        <C.HeaderTitle>{title}</C.HeaderTitle>
        <Icon />
      </C.Header>
      <C.Total>{value}</C.Total>
    </C.Container>
  );
};

export default ResumeItem;