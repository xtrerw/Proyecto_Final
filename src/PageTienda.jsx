import React, { useEffect, useState } from 'react';
import TituloPaginas from './componentes_paginas/tituloPaginas';

const Tienda = () => {
    const state={img:'src/img/bg2.png',title:"Tienda",description:"Nuestros regalos van más allá tu pensamiento"};

    const[tienda, setProducto]=useState();
    useEffect(()=>{
        fetch("https://localhost:3001/tienda")
        .then(response => response.json())
        .then(tienda =>{setProducto(tienda)})
        .catch(error => {
            console.error('error:', error);
        });
    },[])
    console.log(tienda);
  return (
    <>
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
    <main>
        {}
    </main>
    </>
    
  )
}

export default Tienda
