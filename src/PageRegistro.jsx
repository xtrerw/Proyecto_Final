import React, { useState } from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
import "./PageRegistro.css"
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
const Registro = () => {
    const state={img:'src/img/bg5.png',title:"Registro",description:"Únete a los Mejores, Compite con Pasión"};
    const items=["usuario","administrador"];
    const txtInform=["nombre","apellidos",];
    const emails=["correo electrónico","confirma correo"]
    const pwds=["contraseña","confirma contraseña"]
    const ptoRegistro=[0,1,2,3]
    const ptoAdmin=[0,1,2,3,4]
    //elegir usuario o administrador
    const [click,setClick]=useState(items[0]);
    //los pasos de registro
    const inputUser = {//animacion de input
      vamos: { opacity: 0, x: 100 },
      quedamos: { opacity: 1, x: 0 },
      nosvamos: { opacity: 0, x: -100 }
    };
    const pasosUser=["userName","txtInform","emails","pwds"]//para carrusel de los inputs
    const [clickUser,setClickUser]=useState(pasosUser[0]);

  return (
    <>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <main className='tabla-registro'>
        <section className='tabla'>
          <div className='tabla-seleccion'>
            {items.map((item, index) =>(
              <motion.div 
              key={index}
              whileHover={{
                backgroundColor:item==click? 'var(--main-color2)':'var(--main-color)',
              }}
              animate={{
                backgroundColor:item==click? 'var(--main-color)':'#000',
                cursor:"pointer"
              }}
              className={item}
              onClick={()=>setClick(item)}
              >
                <p>{item}</p>
              </motion.div>
            ))}
          </div>

          {click==items[0]?
            <AnimatePresence>
              <motion.div className='tabla-user'>
                
                  { clickUser==pasosUser[0]? 
                  <AnimatePresence>
                    <motion.div 
                    key={clickUser? clickUser:""}
                    variants={inputUser}
                    initial='vamos'
                    animate='quedamos'
                    exit='nosvamos'
                    >
                      <label htmlFor="nombreUser">
                        <p>nombre de usuario</p>
                        <input type="text" />
                      </label>
                    </motion.div>
                    </AnimatePresence> :
                    clickUser==pasosUser[1]? 
                    <AnimatePresence>
                    <motion.div key={clickUser? clickUser:""}
                    variants={inputUser}
                    initial='vamos'
                    animate='quedamos'
                    exit='nosvamos'
                    >
                    {txtInform.map((input,index)=>
                      <label htmlFor={input} key={index}>
                        <p>{input}</p>
                        <input type="text"/>
                      </label>
                    )}
                  </motion.div>
                  </AnimatePresence> :
                  clickUser==pasosUser[2]?
                    <motion.div
                    variants={inputUser}
                    initial='vamos'
                    animate='quedamos'
                    exit='nosvamos'
                    >
                      {emails.map((email,index)=>
                        (
                        <label key={index} htmlFor={email}>
                          <p>{email}</p>
                          <input type="email" />
                        </label>)
                      )}
                    </motion.div>:
                    <AnimatePresence>
                      <motion.div
                      variants={inputUser}
                      initial='vamos'
                      animate='quedamos'
                      exit='nosvamos'
                      >
                        {pwds.map((pwd,index)=>
                        (
                        <label key={index} htmlFor={pwd}>
                          <p>{pwd}</p>
                          <input type="password" />
                        </label>)
                      )}
                      </motion.div>
                    </AnimatePresence>
                  }
                
              </motion.div>
          </AnimatePresence>:
          <AnimatePresence></AnimatePresence>
          }
   
          <AnimatePresence>
            <motion.div className='ptos' 
            initial={{
              x:100,//los puntos entra desde derecha a izquierda
              opacity:0
            }}
            animate={{
              x:0,
              opacity:1,
            }}
            exit={{
              x:-100,
              opacity:0
            }}
            key={click? click:""}//si ya pongamos click de usuario o administrador, aparece animaci'on
            >
                {click=='usuario'?
                  ptoRegistro.map(pto=>
                    <motion.div key={pto} className='pto-usuario' onClick={()=>setClickUser(pasosUser[pto])} 
                    whileHover={{
                      background:pasosUser[pto]==clickUser? 'var(--main-color2)':'var(--main-color)'
                    }}
                    animate={{
                      background:pasosUser[pto]==clickUser? 'var(--main-color)':'',
                      cursor:'pointer'
                    }}
                    ></motion.div>
                  ) : ptoAdmin.map(pto=>
                    <motion.div key={pto} className='pto-usuario' onClick={()=>setClickUser(pto)}></motion.div>
                  ) 
                }
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </>
  )
}

export default Registro
