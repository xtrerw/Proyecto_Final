import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import "./Producto.css"
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { AnimatePresence } from 'framer-motion'
//hook redux y metodo de action
import { useDispatch } from 'react-redux'
import { enviarPtos } from './actions/action'

const Producto = (propsPerfil) => {
  //Redux
  const dispatch = useDispatch();
  //conseguir id de producto
  const {id}=useParams();
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

  const apartados = producto.apartados || [];//si producto es null, volve a array de espacio
  const yaClick = (apartado) => {
    setImg(apartado);
    setClickIndex(apartado); 
  };//

  //canejar los premios
  //realizar canejo y actualiza de los datos en node js 
  const [resto,setResto]=useState(propsPerfil.ptos);
  //no tiene suficientes ptos
  const [pobre,setPobre]=useState('')
  //sale factura
  const [factura,setFactura]=useState(false);
  //para actualizar los puntos en bd
  const canejar=async()=>{
    const newResto=resto-producto.precio
    // asegurar que el usuario no consuma más de lo que tiene
    if (newResto < 0) {
      setPobre("No tienes suficientes puntos para canejar. Pobrecito");
      return;
  }
    setResto(newResto)
    //metodo put para actualizar
    try {
      const response = await fetch(`http://localhost:3001/`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id:propsPerfil.id,
          ptos:newResto,
        }),
      })
      const resulta= await response.json()
      if (response.ok) {
        console.log('actualiza éxito'+resulta.ptos);
        setResto(newResto);
        //tramitar las acciones de enviar ptos de resto
        dispatch(enviarPtos(newResto))
        //luego vam a navbar
        //sale factura
        setFactura(true);
      }else{
        console.log('No encuentro usuario');
      }

    } catch (error) {
      console.error('Error actualizar los puntos'+error)
    }
  }

  

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
  //animacion de factura parece a la maquina
  const y=[];
  for (let i =300; i>=0 ; i=i-50) {
    y.push(i)    
  }

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
        <p>Precio: {producto.precio} ptos</p>
        <p>Características: {producto.caracteristica}</p>
        <p>Tipo de Juego: {producto.tipoJuego}</p>
        <p>Clasificación: {producto.clasificacion}</p>
        <p>Dimensiones: {producto.altura} x {producto.anchura} x {producto.profundidad}</p>
        {/* realiza canejo */}
        <button className='btn-canejar' onClick={()=>{
          canejar();
          setFactura(false);
        }}>Canejar ahora</button>
        <motion.p
        className='pobre'
        animate={{
          opacity:1,
          color:'var(--main-color)',
          y:0,
          fontSize:"10px",
        }}
        >{pobre}</motion.p>
      </motion.div>
      {factura? 
      <div className='factura-maquina'>
        <motion.div className='factura'
        animate={{
          opacity:1,
          y:y
        }}
        transition={{
          duration:2,
          ease:'anticipate',
        }}
        >
          <i className='bx bx-x-circle' onClick={()=>{setFactura(false)}} ></i>
          <div className='factura-contenido'>
            <h1 className='factura-titulo'>Factura de Premio</h1>
            <p className='factura-infor'>Usuario: {propsPerfil.nombre}</p>
            <hr />
            <p className='factura-infor'>Premio:</p>
            <section className='factura-flex'>
              <p className='factura-infor factura-nombre'>{producto.nombre }</p>
              <p className='factura-infor'>{producto.precio} ptos</p>
            </section>
            <hr />
            <section className='factura-flex'>
              <p className='factura-infor'>Tus puntos actuales:</p>
              <p className='factura-infor'>{resto} ptos</p>
            </section>
          </div>
        </motion.div> 
        <motion.div className='maquina'
        animate={{
          borderTop:["0px solid var(--main-color)","10px solid var(--main-color)","0px solid var(--main-color)"],
          opacity:[1,1,0],
        }}
        transition={{
          duration: 3,
          ease:"anticipate",
        }}
        ></motion.div>
      </div>
      :''}
      
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
