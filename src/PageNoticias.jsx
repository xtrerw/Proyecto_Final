import React, { useEffect, useState } from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas';
import { Link } from 'react-router-dom';
import "./PageNoticias.css"
import { motion } from 'framer-motion';
const Noticias = () => {
    const state={img:'src/img/bg4.png',title:"Noticias",description:"Vive la Competencia"};

    const [noticias, setNoticias]=useState([]);
    useEffect(()=>{
      fetch('http://localhost:3001/noticias')
      .then(response=>response.json())
      .then((data)=>setNoticias(data))
      .catch((error)=>console.error("Error de conseguir los datos "+error));
    },[])
  return (
    <>
    <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
    <main className='page-noticias'>
      {noticias.map((noticia,index)=>(
        <div key={index} className="noticia-contenido">
          <img src={`../${noticia.img}`} alt={noticia.titulo} />
          <p>{noticia.tipoJuego}</p>
          <Link to={`${noticia._id}`}>
            <motion.h3 
            initial={{
              color: 'rgb(97, 97, 97)',
              fontWeight:'bold',
            }}
            whileHover={{
              color: 'var(--main-color)',
            }}
            >{noticia.titulo}</motion.h3>
          </Link>
        </div>
      ))}
    </main>
    </>
  )
}

export default Noticias
