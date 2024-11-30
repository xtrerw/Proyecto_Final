import React, { useEffect, useRef, useState } from 'react';
import TituloPaginas from './componentes_paginas/tituloPaginas';
import "./PageTienda.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { Link, Route, Routes } from 'react-router-dom';
import TopPremio from './componentes_paginas/TopPremio';
import { motion } from 'framer-motion';
//hook redux y metodo de action
import { useDispatch } from 'react-redux'
import { enviarPtos } from './actions/action'
  const Tienda = ({propsPerfil,cartItems,setCartItems}) => {
        const state={img:'src/img/bg2.png',title:"Tienda",description:"Lleva tu juego al siguiente nivel"};
        // clic carrito
        const [cart, setCart]=useState(false);
        // conseguir los productos 
        const [tienda, setProducto]=useState([]);
        //actualizar los puntos desupes de la compra
        const dispatch = useDispatch();
        //realizar canejo y actualiza de los datos en node js 
        const [resto,setResto]=useState(propsPerfil.ptos);
        //no tiene suficientes ptos
        const [pobre,setPobre]=useState('')
        //para actualizar los puntos en bd
        const [total,setTotal]=useState(0)


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
        // gsap.registerPlugin(Observer,ScrollTrigger);
        useEffect(() => {
             let sum = cartItems.reduce((total, item) => total + item.cantidad * item.precio, 0);
            // calcula el total de los productos en el carrito           
            setTotal(sum);
        }, [cartItems]);
        
        const canjear = async () => {
            
            // calcula el resto de puntos despues de la compra
            const newResto = resto - total;
        
            if (newResto < 0) {
              setPobre("No tienes suficientes puntos para canjear. Pobrecito");
              return;
            }
        
            setResto(newResto);
            try {
              const response = await fetch(`http://localhost:3001/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: propsPerfil._id,
                  ptos: newResto,
                }),
              });
        
              const result = await response.json();
        
              if (response.ok) {
                console.log("Actualización exitosa:", result.ptos);
                setResto(newResto);
                dispatch(enviarPtos(newResto)); // actualizar redux
                setTotal(0);
                setCartItems([]);
              } else {
                alert("No se pudo encontrar el usuario.");
              }
            } catch (error) {
              alert("Error al actualizar los puntos:" + error);
            }
          };
       

    return (
      <>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <main className="page-tienda">
        {/* carrito */}
        <i onClick={()=>setCart(!cart)} className={cart? 'bx bxs-cart':'bx bx-cart'} ></i>

       {/* factura */}
        {cart? 
        <motion.div className='factura-maquina'
        animate={{
            opacity:[0,1],
        }}
        transition={{
            duration:1,
            ease:'anticipate',
        }}
        >
            <motion.div className='factura'
            animate={{
            opacity:[0,1],
            y:[10,0]
            }}
            transition={{
            duration:1,
            ease:'anticipate',
            }}
            >
            <i className='bx bx-x-circle' onClick={()=>{setCart(false)}} ></i>
            <div className='factura-contenido'>
                <h1 className='factura-titulo'>carrito</h1>
                <p className='factura-infor'>Usuario: {propsPerfil.nombreUsuario}</p>
                <hr />
                {/* producto agregado */}
                {(cartItems?.length || 0) > 0 ? (
                <>
                    {cartItems.map((item, index) => (
                        <div key={index} className="factura-item">
                        <strong className='factura-infor factura-nombre'>{item.nombre}</strong>
                        <p className='factura-infor'>Cantidad: {item.cantidad}</p>
                        </div>
                    ))}
                    <hr />
                    <div className="factura-total">
                        <p className='factura-infor'>
                            <b>Total a pagar:</b>
                            {total}ptos
                        </p>
                    </div>
                </>
                ) : (
                  <p className='factura-infor'>El carrito está vacío</p>
                )}
                <p className='factura-advi'>{pobre}</p>
            </div>
            <button className='btn-compra btn btn-primary'
            onClick={canjear}
            >canjear</button> 
            </motion.div>
        </motion.div>
        :null}




        {/* lista de productos */}
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
      <TopPremio/>
      </>
    )
  }

  export default Tienda;
