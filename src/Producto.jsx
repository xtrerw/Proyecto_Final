import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Producto.css"
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { AnimatePresence } from 'framer-motion'
const Producto = () => {
  const {id}=useParams();
  console.log(id);
  const[producto, setProducto]=useState([]);
  const [imgParte, setImg]=useState();//la imagen se muestra cuando elegido la imagen del menú
  const [clickIndex, setClickIndex]=useState();//agregar diseño de la figura elegido actualmente
  useEffect(()=>{
    fetch('http://localhost:3001/tienda')
      .then(response => response.json())
      .then(producto => {//encontra las detalles del producto que queria acceder
        const foundProducto = producto.find(item => item._id === id);
        setProducto(foundProducto);
        if (foundProducto && foundProducto.apartados) {
          setImg(foundProducto.apartados[0])//establece el primero imagen del producto a la defecta
        }
      })
      .catch(error => {
          console.error('error:', error);
      });
  },[id]);//actualizar componente de producto a través de id

  console.log(producto);
  const apartados = producto.apartados || [];//si producto es null, volve a array de espacio
  console.log(apartados);
  console.log(clickIndex);
  const yaClick = (apartado) => {
    setImg(apartado);
    setClickIndex(apartado); 
  };//

  //animacion de exhibición de las imagenes
  gsap.registerPlugin(ScrollTrigger);
  const gsapImgs= gsap.utils.toArray('.exhibicion-img');
  useEffect(()=>{
    ScrollTrigger.create({
      trigger: '.exhibicion',
      scrub:4,
      markers:false,
      start:"-20% 0%",
      end:"10% 0%",
      toggleActions: "restart none reverse none",
      // pin:true,
      animation:
      gsap.timeline()
      .fromTo('.scroll-left',{
        x: "-60%",
        width: '500%',
        gap: '0.5%',
      },
      {
        x:"-20%",
        width:"200%",
        gap: '2%',
      },"<")
      .fromTo(gsapImgs,{
        borderRadius:'0px',
        width:'100vw',
        height: '100vh',
      },
      {
        width:'50vw',
        height: '50vh',
        borderRadius:'20px',

      },"<")
      .fromTo('.scroll-right',{
        x: "-20%",
        width: '500%',
        gap: '0.5%'
      },
      {
        x:"-30%",
        width:"200%",
        gap: '2%'
      },"<")
    });
  },[gsapImgs])
  return (
    <>
      <main className='detalle'>
      <div className='producto-conjunto' >
        {apartados.map((apartado,index)=>(
          <motion.div onClick={()=>{yaClick(apartado)}} key={index} className="producto-apartado"
          animate={{
            backgroundImage: `url(../${apartado})`,
            boxShadow: apartado==clickIndex ? "0px 0px 1px 2px var(--main-color)" : "none",
            }}//si ya ha elegido elemento actual , pues aparezca la animación
            >
          </motion.div>
        ))}
      </div>
      <div className='producto-img'>
        <AnimatePresence>
          <motion.div 
            initial={{
              y:20,
              opacity:0,
            }}
            animate={{
              opacity:1,
              y:0,
              backgroundImage: imgParte?  `url(../${imgParte})`:'none'
            }} 
            exit={{
              opacity:0,
              y:-20
            }}
            transition={{
              duration:1,
              ease: 'easeInOut',
            }}
            className='producto-img'
            key={imgParte? imgParte:""}//cambiar la imagen por elegir elemento de menu
          ></motion.div>
        </AnimatePresence>
      </div>
      <motion.div className='producto-detalle' 
      initial={{
        opacity:0,
        x:30
      }}
      animate={{
        opacity:1,
        x:0,
      }}
      transition={{
        delay:1,
        duration:1
      }}
      >
        <h2>{producto.nombre}</h2>
        <h3>Descripción</h3>
        <hr />
        <p>{producto.descripcion}</p>
        <p>Precio: {producto.precio} ptos</p>
        <p>Características: {producto.caracteristica}</p>
        <p>Tipo de Juego: {producto.tipoJuego}</p>
        <p>Clasificación: {producto.clasificacion}</p>
        <p>Dimensiones: {producto.altura} x {producto.anchura} x {producto.profundidad}</p>
        <button className='btn-canejar'>Canejar ahora</button>
      </motion.div>
    </main>
    <main className='exhibicion'>
      <div className='exhibicion-set scroll-left'>
      {apartados.map((apartado,index)=>(
          <div  key={index} className="exhibicion-img " 
          style={{
            backgroundImage: `url(../${apartado})`,
            }}>
          </div>
        ))}
      </div>
      <div className='exhibicion-set scroll-right'>
      {apartados.map((apartado,index)=>(
          <div  key={index} className="exhibicion-img" 
          style={{
            backgroundImage: `url(../${apartado})`,
            }}>
          </div>
        ))}
      </div>
    </main>
    </>
  )
}

export default Producto
