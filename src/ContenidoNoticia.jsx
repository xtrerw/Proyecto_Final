import React, { useEffect, useState } from 'react'
import "./ContenidoNoticia.css"
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const ContenidoNoticia = () => {
    const {id}=useParams();
    console.log(id);
    const [noticia, setNoticia]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3001/noticias')
        .then(response=>response.json())
        .then(noticia=>{
            const foundNew=noticia.find(item=>item._id==id);
            if (foundNew) {
                setNoticia(foundNew);
            } else {
                throw new Error(`No se encontró ninguna noticia con el ID ${id}`);
            }
        })
        .catch(error=>console.error("Error de conseguir API"+ error));
    },[id]);
    console.log(noticia);
  return (
    <>
        <main className='contenido'>
            <motion.div 
            initial={{
                height:"100vh",
                opacity: 0
            }} 
            animate={{
                height:"50vh",
                opacity: 1
            }} 
            transition={{
                duration: 2,
                ease: "anticipate"
            }}
            className='bg-contenido'></motion.div>
            <motion.div className='bg-contenido2' style={{backgroundImage:`url(../${noticia.img})`}}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                delay: 1,
                duration: 1,
            }}
            ></motion.div>
            <motion.div className='bg-contenido2'
            initial={{
                y:"0",
                background:"#fff"
            }}
            animate={{
                y:"100%",
                background:"none",
                // opacity: 0,
            }}
            transition={{
                duration: 3,
                ease: "anticipate"
            }}
            ></motion.div>
        </main>
        <motion.main className='articulo'
            initial={{
                y:100,
                opacity: 0,
            }}
            animate={{
                y:0,
                opacity: 1,
            }}
            transition={{
                delay:2,
                duration: 3,
                ease: "anticipate"
            }}
        >
            <h3>{noticia.fecha} - POR ONLYGG ESPORT STAFF</h3>
            <h2>{noticia.titulo}</h2>
            <p>{noticia.contenido}</p>
        </motion.main>
    </>
    
  )
}

export default ContenidoNoticia
