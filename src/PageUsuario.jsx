import React, { useState } from 'react'
import "./PageUsuario.css"
import { motion } from 'framer-motion'
const PageUsuario = (propsUser) => {
    //estabelece nueva contraseña
    const[olvidado,isOlvidado]=useState(false)
    //variantes de item derecho
    //padre variantes
    const container={
        aparece:{
            opacity:[0,1],
            transition:{
                delayChildren:1,
                staggerChildren:0.5,
            }
        }
    }
    //hijo variantes
    const itemRight={
        aparece:{
            scale:[0.5,1],
            opacity:[0,1],
            transition:{
                duration:2,
                ease:"backInOut"
            }
        },
    }
  return (
    <main className='usuario'>
        <section className='usuario-tarjeta'>
            <motion.div className='usuario-nombre'
                animate={{
                    opacity:[0,1],
                    y:[-20,0]
                }}
                transition={{
                    delay:1,
                    duration:1,
                    ease:"anticipate"
                }}
            >
                {propsUser.nombre} {propsUser.apellidos} 
            </motion.div>
            <motion.div className='usuario-infor'
            animate={{
                opacity:[0,1],
                y:[-20,0]
            }}
            transition={{
                duration:2,
                ease:"backInOut"
            }}>
                <div className='tus-datos'>
                    <h2>
                        tus datos
                    </h2>
                    <div className='usuario-iniciar'>
                        <i className='bx bx-user' ></i>
                        {propsUser.user}
                    </div>
                    <div className='usuario-iniciar'>
                        <i className='bx bx-envelope'></i>
                        {propsUser.email}
                    </div>
                    
                    {olvidado?
                    <input className='usuario-iniciar' type='password' placeholder='Estabelece tu contraseña nueva'/>
                    : <p onClick={()=>isOlvidado(true)}>Se ha olvidado tu contraseña</p>}
                </div>
                <motion.div className='usuario-img' 
                style={{
                    backgroundImage: `url(${propsUser.img})`    
                }}
                animate={{
                    boxShadow:["0px 0px 5px #fff","0px 0px 20px #fff","0px 0px 5px #fff"]
                }}
                transition={{
                    repeat:Infinity,
                    duration:3,                  
                }}
                ></motion.div>
            </motion.div>
        </section>
        <motion.section className='usuario-infor2'
        variants={container}
        animate='aparece'
        >
            <motion.div className='usuario-ptos'
            variants={itemRight}
            initial={{
                borderRadius:"50%"
            }}
            >
                <p>{propsUser.ptos} Ptos</p>
            </motion.div>
            <motion.div className='usuario-ptos'
            variants={itemRight}
            initial={{
                borderRadius:"20%"
            }}
            ></motion.div>
            <motion.div className='usuario-ptos'
            variants={itemRight}
            initial={{
                borderRadius:"20%"
            }}
            ></motion.div>
        </motion.section>
    </main>
  )
}

export default PageUsuario
