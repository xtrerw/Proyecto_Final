import React from 'react';
import TituloPaginas from './componentes_paginas/tituloPaginas';

const Tienda = () => {
    const state={img:'src/img/bg3.png',title:"Tienda",description:"Nuestros regalos van más allá tu pensamiento"};
  return (
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
  )
}

export default Tienda
