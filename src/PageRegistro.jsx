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
    //pasos de usuario
    const pasosUser=["userName","txtInform","emails","pwds"]//para carrusel de los inputs
    const [clickUser,setClickUser]=useState(pasosUser[0]);
    //pasos de administrador
    const pasosAdmin=["dasdsa","dqwewqe","ewqeqw","cxzc","jtyht"]//hay que modificar los pasos de registro o inicial sessión de administrador
    const [clickAdmin,setClickAdimn]=useState(pasosAdmin[0]);
    //animacion de hover btn
    const [hover,setHover]=useState(false)
    const lineaUpDown={
      sinHover:{
      width: '0px',
      height: '0px',
      opacity:0
      },
        hover:{
        width:hover? '170px':'0px',
        height:hover? '1px':'0px',
        opacity:hover? 1:0,
      },
    }
    const lineaRightLeft={
      sinHover:{
      width: '0px',
      height: '0px',
      opacity:0
    },
      hover:{ 
      width:hover? '1px':'0px',
      height:hover? '25px':'0px',
      opacity:hover? 1:0,
    },
    }

    const [valor,setValor]=useState();

  // click btn para enviar los datos
  const [btn,clickBtn]=useState(false)
      // Form data state
      const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        contrasena: '',
        userName: ''
    });
    const [confirmaCorreo, setConfirmaCorreo] = useState(null);
    const [confirmaContrasena, setConfirmaContrasena] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleConfirmaCorreoChange = (e) => {
      setConfirmaCorreo(e.target.value);
  };

  const handleConfirmaContrasenaChange = (e) => {
      setConfirmaContrasena(e.target.value);
  };
  
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:3001/registro', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });
    //         const result = await response.json();
    //         console.log('Success:', result);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
  return (
    <>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <main className='tabla-registro'>
        <section className='tabla'>
          <div className='tabla-seleccion'>
            {/* secciones de cabecera de formulario, items que tiene usuario y administrador */}
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
            {/* si elija la selección usuario, aparece su tabla */}
          {click==items[0]?
            <AnimatePresence>
              <motion.div className='tabla-user'>
                {/* se aparezca los campos si elige los correspondientes pasos */}
                  { clickUser==pasosUser[0]? 
                  <AnimatePresence>
                    {/* 1º input */}
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
                      <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      onClick={()=>setClickUser(pasosUser[1])}//al siguiente campo
                      type='submit'
                      animate={{
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      >
                        <motion.i 
                        initial={{
                          x:10,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:hover? 200:10,
                          // opacity:hover? 0:1
                        }}
                        transition={{
                          duration:1,
                          ease:'anticipate'
                        }}
                        className='bx bx-arrow-back bx-rotate-180'></motion.i>
                        <motion.i 
                        initial={{
                          x:-200,
                          rotate:"180deg",
                          // opacity:0
                        }}
                        animate={{
                          x:hover? -10:-200,
                          // opacity:hover? 1:0
                        }}
                        transition={{
                          duration:1,
                          ease:'anticipate'
                        }}
                        className='bx bx-arrow-back bx-rotate-180'></motion.i>
                      </motion.button>
                    </motion.div>
                    </AnimatePresence> :
                    clickUser==pasosUser[1]? 
                    <AnimatePresence>
                      {/* 2º input */}
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
                    <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      onClick={()=>setClickUser(pasosUser[2])}//al siguiente campo
                      type='submit'
                      animate={{
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      >
                        <motion.i 
                        initial={{
                          x:10,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:hover? 200:10,
                          // opacity:hover? 0:1
                        }}
                        transition={{
                          duration:1,
                          ease:'anticipate'
                        }}
                        className='bx bx-arrow-back bx-rotate-180'></motion.i>
                        <motion.i 
                        initial={{
                          x:-200,
                          rotate:"180deg",
                          // opacity:0
                        }}
                        animate={{
                          x:hover? -10:-200,
                          // opacity:hover? 1:0
                        }}
                        transition={{
                          duration:1,
                          ease:'anticipate'
                        }}
                        className='bx bx-arrow-back bx-rotate-180'></motion.i>
                      </motion.button>
                  </motion.div>
                  </AnimatePresence> :
                  // 3º input
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
                      {/* Advertencia de correo */}
                      <p className='advertencia'>
                        {formData.contrasena !== confirmaContrasena && (<i className='bx bx-x-circle' ></i>)}
                        {formData.correo !== confirmaCorreo? 'Los correos no coinciden':''}
                      </p>
                      <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      onClick={()=>setClickUser(pasosUser[3])}//al siguiente campo
                      type='submit'
                      animate={{
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      >
                        <motion.i 
                        initial={{
                          x:10,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:hover? 200:10,
                          // opacity:hover? 0:1
                        }}
                        transition={{
                          duration:1,
                          ease:'anticipate'
                        }}
                        className='bx bx-arrow-back bx-rotate-180'></motion.i>
                        <motion.i 
                        initial={{
                          x:-200,
                          rotate:"180deg",
                          // opacity:0
                        }}
                        animate={{
                          x:hover? -10:-200,
                          // opacity:hover? 1:0
                        }}
                        transition={{
                          duration:1,
                          ease:'anticipate'
                        }}
                        className='bx bx-arrow-back bx-rotate-180'></motion.i>
                      </motion.button>
                    </motion.div>:
                    // la ultima input
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
                        </label>
                      ))}
                      {/* Advertencia de contraseña */}
                      <p className='advertencia'>
                        {formData.contrasena !== confirmaContrasena && (<i className='bx bx-x-circle' ></i>)}
                        {formData.contrasena !== confirmaContrasena? "Las contraseñas no coinciden":""}
                      </p>
                      {/* btn registro */}
                      <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      onClick={()=>clickBtn(true)}
                      type='submit'
                      animate={{
                        color:hover? 'orange': '#fff',
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      >
                        {/* tranferir la variant que establecemos */}
                        <motion.hr className='up-linea'
                      variants={lineaUpDown}
                      initial='sinHover'
                      animate='hover'
                      ></motion.hr>
                      <motion.hr className='right-linea'
                      variants={lineaRightLeft}
                      initial='sinHover'
                      animate='hover'
                      ></motion.hr>
                        Registrar
                        <motion.hr className='left-linea'
                      variants={lineaRightLeft}
                      initial='sinHover'
                      animate='hover'
                      ></motion.hr>
                      <motion.hr className='under-linea'
                      variants={lineaUpDown}
                      initial='sinHover'
                      animate='hover'
                      ></motion.hr>
                      </motion.button>
                      </motion.div>
                    </AnimatePresence>
                  }
                
              </motion.div>
          </AnimatePresence>:
          <AnimatePresence></AnimatePresence>
          }
          {/* los punto si elige */}
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
              {/* ptos en la usuario */}
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
                  ) : 
                  // ptos en la administrador
                  ptoAdmin.map(pto=>
                    <motion.div key={pto} className='pto-usuario' onClick={()=>setClickAdimn(pasosAdmin[pto])}
                    whileHover={{
                      background:pasosAdmin[pto]==clickAdmin? 'var(--main-color2)':'var(--main-color)'
                    }}
                    animate={{
                      background:pasosAdmin[pto]==clickAdmin? 'var(--main-color)':'',
                      cursor:'pointer'
                    }}
                    ></motion.div>
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
