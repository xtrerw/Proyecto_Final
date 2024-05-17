import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Producto.css"
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

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
  const yaClick = (apartado) => {
    setImg(apartado);
    setClickIndex(apartado); 
  };//

  //animacion de exhibición de las imagenes
  gsap.registerPlugin(ScrollTrigger);
  const gsapImgs= gsap.utils.toArray('.exhibicion-img');
  useGSAP(()=>{
    ScrollTrigger.create({
      trigger: '.exhibicion',
      scrub:true,
      markers:true,
      start:"-20% 0%",
      end:"10% 0%",
      toggleActions: "restart none reverse none",
      // pin:true,
      animation:
      gsap.timeline().fromTo('.exhibicion',{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },{
        width:'100%',
      },"<")
      .fromTo('.exhibicion-set',{
        width: '500%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: '0px'
      },
      {
        width:"80%",
        display:'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap:'10px'
      },"<")
      .fromTo(gsapImgs,{
        width:'100%',
        height: '100%',
        borderRadius:'0%',
      },
      {
        width:'90%',
        height: '90%',
        borderRadius:'2%',

      },"<")
    });
  })
  return (
    <>
      <main className='detalle'>
      <motion.div className='producto-conjunto' initial={{x:-30,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:1,duration:2}}>
        {apartados.map((apartado,index)=>(
          <motion.div onClick={()=>{yaClick(apartado)}} key={index} className="producto-apartado" 
          animate={{
            backgroundImage: `url(../${apartado})`,
            boxShadow: clickIndex==apartado ? "0px 0px 1px 2px var(--main-color)" : "none",
            }}
            >
          </motion.div>
        ))}
      </motion.div>
      <div className='producto-img'>
        {imgParte && <motion.img initial={{scale:0.5}} animate={{scale:1}} transition={{duration:1}} src={`/${imgParte}`}/>}
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
        <p>Precio: {producto.precio}</p>
        <p>Características: {producto.caracteristica}</p>
        <p>Tipo de Juego: {producto.tipoJuego}</p>
        <p>Clasificación: {producto.clasificacion}</p>
        <p>Dimensiones: {producto.altura} x {producto.anchura} x {producto.profundidad}</p>
        <button className='btn-canejar'>Canejar ahora</button>
      </motion.div>
    </main>
    <main className='exhibicion'>
      <div className='exhibicion-set'>
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
