import React from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
const Registro = () => {
    const state={img:'src/img/bg5.png',title:"Registro",description:"Únete a los Mejores, Compite con Pasión"};
  return (
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
  )
}

export default Registro
