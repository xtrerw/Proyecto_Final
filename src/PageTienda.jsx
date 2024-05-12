import React, { useEffect, useState } from 'react';
import TituloPaginas from './componentes_paginas/tituloPaginas';
import "./PageTienda.css";
const Tienda = () => {
    const state={img:'src/img/bg2.png',title:"Tienda",description:"Nuestros regalos van más allá tu pensamiento"};

    const[tienda, setProducto]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3001/tienda')
        .then(response => response.json())
        .then(tienda =>{setProducto(tienda)})
        .catch(error => {
            console.error('error:', error);
        });
    },[]);
  return (
    <>
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
    <main className='page-tienda'>
        <div className='productos'>
        {tienda.map(item => (
                    <div key={item._id} className='producto'>
                        <img src={item.img} />
                        <h3>{item.nombre}</h3>
                    </div>
                ))}
        </div>
    </main>
    </>
    
  )
}

export default Tienda;
