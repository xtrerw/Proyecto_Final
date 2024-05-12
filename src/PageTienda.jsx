import React, { useEffect, useState } from 'react';
import TituloPaginas from './componentes_paginas/tituloPaginas';

const Tienda = () => {
    const state={img:'src/img/bg2.png',title:"Tienda",description:"Nuestros regalos van más allá tu pensamiento"};

    const[producto, setProducto]=useState();
    useEffect(()=>{
        fetch("https://localhost:2000/tienda")
        .then(producto =>{setProducto()})
    })

  return (
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>

  )
}

export default Tienda
