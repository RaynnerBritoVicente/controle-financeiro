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
const Resume = ({ entradas, saidas, total }) => {
  return (
    <C.Container>
      <ResumeItem
        title="Entradas"
        Icon={FaRegArrowAltCircleUp}
        value={entradas}
      />
      <ResumeItem
        title="Saídas"
        Icon={FaRegArrowAltCircleDown}
        value={saidas}
      />
      <ResumeItem title="Total" Icon={FaDollarSign} value={total} />
    </C.Container>
  );
};

export default Resume;