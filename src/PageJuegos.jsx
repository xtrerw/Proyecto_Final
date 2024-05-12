import React from "react"
import TituloPaginas from './componentes_paginas/tituloPaginas';

export default function Games(){
  const state={img:'src/img/bg3.png',title:"Our Games",description:"Descubre tu potencial en los juegos"};
  return (
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
  )
}



