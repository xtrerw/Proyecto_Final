import React from 'react'
import "./PageUsuario.css"
import { motion } from 'framer-motion'
const PageUsuario = (propsUser) => {
  return (
    <main className='usuario'>
        <section className='usuario-tarjeta'>
            <div className='usuario-nombre'>
                {propsUser.nombre}
            </div>
            <div className='usuario-infor'>
                <div></div>
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
            </div>
        </section>
    </main>
  )
}

export default PageUsuario
