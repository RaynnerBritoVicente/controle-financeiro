import React from "react";
import ResumeItem from "../ResumeItem";
import * as C from "./styles"; //importando os componentes do arquivo styles
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa"; //importando os icones do react-icons

// Estrutura do Resume recebendo os parametros do arquivo 'App'
//Componentes recebendo as informações: title, icon e value que serão utilizadas no componente 'Resumeitem'
const Resume = ({ income, expense, total }) => {
  return (
    <C.Container>
      <ResumeItem
        title="Entradas"
        Icon={FaRegArrowAltCircleUp}
        value={income}
      />
      <ResumeItem
        title="Saídas"
        Icon={FaRegArrowAltCircleDown}
        value={expense}
      />
      <ResumeItem title="Total" Icon={FaDollarSign} value={total} />
    </C.Container>
  );
};

export default Resume;