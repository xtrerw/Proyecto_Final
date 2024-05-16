  import React, { useEffect, useRef, useState } from 'react';
  import TituloPaginas from './componentes_paginas/tituloPaginas';
  import "./PageTienda.css";
  import { useGSAP } from "@gsap/react";
  import gsap from "gsap";
  import {ScrollTrigger} from "gsap/ScrollTrigger";
  import { Link, Route, Routes } from 'react-router-dom';
  import {Observer} from "gsap/Observer";
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
      // console.log(tienda);
      // animacion de los premios
      // crear refs
      const container=useRef();
      // animacion de gsap
      gsap.registerPlugin(ScrollTrigger);
      useEffect(() => {
        if (tienda.length > 0) { 
            gsap.fromTo(".producto", {
                y: 100,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: container.current,
                    // markers: true,
                    start: "0% 80%",
                    end: "0% 80%",
                    toggleActions: "restart none reverse none",
                },
            });
        }
    }, [tienda]);
    //drag las cartas
    gsap.registerPlugin(Observer,ScrollTrigger);
    const premios=gsap.utils.toArray(".top-premio")
    useEffect(() => {
      // function move(xself) {
        ScrollTrigger.create({
          trigger: ".top-premio-parte",
          scrub:2,
          markers:true,
          start: "40% 0%",
          end: "40% -50%",
          toggleActions: "restart none reverse none",
          pin: true,
          animation:
          gsap.timeline().fromTo(premios,{
            xPercent:100
          },{
            xPercent:-100 * (premios.length-2),
          })
        });
        
    }, [premios]); 
    return (
      <>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <main className="page-tienda">
          <div className="productos" ref={container}>
            {tienda.map((item) => (
              <Link to={`${item._id}`} key={item._id} className="producto">
                  <div className="precio">
                    <p>{item.precio} ptos</p>
                  </div>
                  <img src={item.img} />
                  <h3>{item.nombre}</h3>
              </Link>
              ))}
          </div>
      </main>
      <main className="top-premios">
        <h1>Top Premios</h1>
        <div className='top-premio-parte'>
          {tienda.map((item,index)=>{
            if (item.precio>200) {
              return(
              <div key={index} style={{backgroundImage:`url(src/img/premio${index}.png)`}} className="top-premio">
                <img src={item.img} />
              </div>)
              }
          })}
        </div>
      </main>
      </>
    )
  }

  export default Tienda;
