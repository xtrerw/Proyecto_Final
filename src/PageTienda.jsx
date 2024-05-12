import React, { useEffect, useState } from 'react';
import TituloPaginas from './componentes_paginas/tituloPaginas';
import "./PageTienda.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const Tienda = () => {
    const state={img:'src/img/bg2.png',title:"Tienda",description:"Nuestros regalos van más allá tu pensamiento"};

    const [tienda, setProducto]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3001/tienda')
        .then(response => response.json())
        .then(tienda =>{setProducto(tienda)})
        .catch(error => {
            console.error('error:', error);
        });
    },[]);
    tienda.length
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
      ScrollTrigger.create({
        trigger:".page-tienda",
        markers:true,
        start:"0 80%",
        end:"0 80%",
        toggleActions: "restart none reverse",
        animation:
        gsap.timeline().fromTo(".productos",{
          y:100,
        },{
          y:0,
          duration:2,
          ease: "expo.inOut",
        }),
      });
    })
  return (
    <>
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
    <main className='page-tienda'>
        <div className='productos'>
        {tienda.map(item => (
                    <div key={item._id} className='producto'>
                        <div className='precio'>
                          <p>{item.precio} ptos</p>
                        </div>
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
