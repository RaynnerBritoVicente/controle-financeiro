import React from 'react'
import * as C from "./styles" //importando os componentes do arquivo 'styles'

//Estruturando o cabeçalho da página
const Header = () => {
  return (
    <C.Container>
        <C.Header>
            <C.Title>Controle Financeiro</C.Title>
        </C.Header>      
    </C.Container>
  )
}

export default Header