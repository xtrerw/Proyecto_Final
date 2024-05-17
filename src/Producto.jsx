import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Producto.css"
import { motion } from 'framer-motion'

const Producto = () => {
  const {id}=useParams();
  console.log(id);
  const[producto, setProducto]=useState([]);
  const [imgParte, setImg]=useState();
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
  };
  return (
    
    <main className='detalle'>
      <div className='producto-conjunto'>
        {apartados.map((apartado,index)=>(
          <motion.div onClick={()=>{yaClick(apartado)}} key={index} className="producto-apartado" 
          animate={{
            backgroundImage: `url(../${apartado})`,
            boxShadow: clickIndex==apartado ? "0px 0px 1px 2px var(--main-color)" : "none",
            }}>
          </motion.div>
        ))}
      </div>
      <div className='producto-img'>
        <img  src={`/${imgParte}`}/>
      </div> 
      <motion.div className='producto-detalle' 
      initial={{
        opacity:0,
        x:100
      }}
      animate={{
        opacity:1,
        x:0,
      }}
      transition={{
        delay:1,
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
      </motion.div>
    </main>
  )
}

export default Producto
