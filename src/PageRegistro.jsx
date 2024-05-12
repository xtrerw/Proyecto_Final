import React from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
const Registro = () => {
    const state={img:'src/img/bg3.png',title:"Registro",description:"Alcanza la victoria"};
  return (
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
  )
}

export default Registro
