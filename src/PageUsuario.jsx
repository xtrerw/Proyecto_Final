import React, { useEffect, useState } from 'react'
import "./PageUsuario.css"
import { motion } from 'framer-motion'
const PageUsuario = (propsUser) => {
    const[equipos,setEquipos]=useState([])
    useEffect(()=>{
        if (propsUser.equipos) {
            setEquipos(propsUser.equipos)
        }
    },[propsUser.equipos])
    console.log("equipo que tiene es ");
    console.log(equipos);
    //introduce informaciones de nuevo
    const[form,setForma]=useState({
        email:propsUser.email,
        user:propsUser.user,
        pwd: propsUser.pwd,
        pwdConfirma: propsUser.pwd
    })
    //introduce input
    const handleChange = (e) => {
        const {name,value}=e.target

        setForma({
            ...form,
            [name]:value,
        })
    }
    //quieres estabelecer contraseña de nuevo
    const itemMenu=['mis datos','contraseña','mis equipos']
    const [menu,setItem]=useState(itemMenu[0])
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
                <div className='menu'>
                    {itemMenu.map((item,index)=>(
                        <motion.div key={index} className='item' onClick={()=>{setItem(item)}}
                        animate={{
                            background: menu==item? 'var(--main-color)':'var(--default-color2)',
                            color:menu==item?  '#fff':'var(--hoverbtn)',
                        }}
                        whileHover={{
                            background: menu==item? 'var(--main-color2)':'var(--main-color)',
                            color: '#fff'
                        }}
                        >
                            {item}
                        </motion.div>
                        ))}
                </div>
                {/* formulario de modifica */}
                <form className='tus-datos'>
                    
                    {menu=='mis datos'? 
                        <div className='item-usuario'>
                            <h2>
                                {menu}
                            </h2>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-user' ></i>
                                <input type="text" name='user' value={form.user} onChange={handleChange} />
                            </div>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-envelope'></i>
                                <input type="email" name='email' value={form.email} onChange={handleChange}/>
                            </div>
                        </div> :
                        menu=='contraseña'?
                        <div className='item-usuario'>
                             <h2>
                                {menu}
                            </h2>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-lock'></i>
                                <input type='password' name='pwd' value={form.pwd} onChange={handleChange} placeholder='Estabelece tu contraseña nueva'/>
                            </div>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-lock'></i>
                                <input type='password' name='pwdConfirma' value={form.pwdConfirma} onChange={handleChange} placeholder='Confirma tu contraseña'/>
                            </div>
                        </div> :
                         menu=='mis equipos'?
                         <div className='item-usuario'>
                             <h2>
                                {menu}
                            </h2>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-envelope'></i>
                                <p>Mis equipos</p>
                            </div>
                        </div> : null}
                    
                    <div className='usuario-btns'>
                        <button type="submit" className='guardar'>Guardar</button>
                        <button type="submit" className='cancelar'>cerrar cuenta</button>
                    </div>
                </form>
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
                {equipos.map((eq,index)=>
                    <div className='equipo-img' key={index}
                        style={{
                            backgroundImage: `url(../${eq.img})`
                        }}
                    ></div>
                )}
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
