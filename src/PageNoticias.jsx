import React from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas';
const Noticias = () => {
    const state={img:'src/img/bg3.png',title:"Noticias",description:"Alcanza la victoria"};
  return (
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
    
  )
}

export default Noticias
