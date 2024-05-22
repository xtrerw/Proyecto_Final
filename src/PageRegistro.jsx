import React, { useState } from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
import "./PageRegistro.css"
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'
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
    //variants de tocar btn submit
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

    // const [valor,setValor]=useState();

  // click btn para enviar los datos
  // const [btn,clickBtn]=useState(false)
      // Form data state
      const [formData, setFormData] = useState({
        nombreUsuario: '',
        nombre: '',
        apellidos: '',
        fechaN: new Date(),
        correo: '',
        confirmaCorreo: '',
        contraseña: '',
        confirmaContraseña: '',
    });

    const hoy =moment();//conseguir fecha de hoy
    const fecha=moment(formData.fechaN)//conseguir la fecha de nacimiento
    const diff = hoy.diff(fecha, 'years');//obtener la edad de usuario

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
  
    const submit = async (e) => {
      e.preventDefault()
      if (diff<18 || formData.correo!=formData.confirmaCorreo || formData.contraseña!=formData.confirmaContraseña) {
        return console.log('condiciones sin válidos');
      }
        
        try {
            const response = await fetch('http://localhost:3001/jugador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //hago así debido a que no quiero enviar los datos de confirma correo y contraseña
                body: JSON.stringify({
                  nombreUsuario: formData.nombreUsuario,
                  nombre: formData.nombre,
                  apellidos: formData.apellidos,
                  fechaN: formData.fechaN,
                  correo: formData.correo,
                  contraseña: formData.contraseña
              }),
            });
            const result = await response.json();
            console.log('Success:', 'Enviar con éxito'+result);
        } catch (error) {
            console.error('Error:', 'Enviar erro '+error);
        }
    };
  return (
    <>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <main className='tabla-registro'>
        <form className='tabla' onSubmit={submit}>
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
                      <label htmlFor="fecha">
                        <p>fecha de nacimiento</p>
                        <input type="date" name='fechaN' value={formData.fechaN} onChange={handleChange}/>
                      </label>
                      <label htmlFor="nombreUser">
                        <p>nombre de usuario</p>
                        <input type="text" name='nombreUsuario' value={formData.nombreUsuario} onChange={handleChange}/>
                      </label>
                      <p className='advertencia'>
                        {/* comprobar los usuario si es menor de edad o si ya introduce al campo */}
                        {(diff <18 || !formData.nombreUsuario) && (<i className='bx bx-x-circle' ></i>)}
                        {diff <18? 'No permite que el menor de edad participan en la torneo. ':''}
                        {!formData.nombreUsuario? 'Introduce el nombre de usuario.':''}
                      </p>
                      {/* btn al siguiente */}
                      <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      onClick={()=>setClickUser(pasosUser[1])}//al siguiente campo
                      type='button'
                      animate={{
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:(diff<18 || !formData.nombreUsuario)? 'var(--disabled-btn)':hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      disabled={(diff<18 || !formData.nombreUsuario)? true:false}
                      >
                        <motion.i 
                        initial={{
                          x:10,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:(diff<18 || !formData.nombreUsuario)? 10:hover? 200:10,
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
                          x:(diff<18 || !formData.nombreUsuario)? -200:hover? -29:-200,
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
                        <input type="text" name={input} value={index==0? formData.nombre: formData.apellidos} onChange={handleChange}/>
                      </label>
                    )}
                    <p className='advertencia'>
                    {(!formData.apellidos || !formData.nombre) && (<i className='bx bx-x-circle' ></i>)}
                        {(!formData.apellidos || !formData.nombre)? 'Introduce el nombre y apellidos':''}
                    </p>
                    <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      onClick={()=>setClickUser(pasosUser[2])}//al siguiente campo
                      type='button'
                      animate={{
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:(!formData.apellidos || !formData.nombre)? 'var(--disabled-btn)':hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      disabled={(!formData.apellidos || !formData.nombre)? true:false}
                      >
                        <motion.i 
                        initial={{
                          x:10,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:(!formData.apellidos || !formData.nombre)? 10:hover? 200:10,
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
                          x:(!formData.apellidos || !formData.nombre)? -200:hover? -29:-200,
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
                          <input type="email" name={index==0? 'correo':'confirmaCorreo'} value={index==0? formData.correo:formData.confirmaCorreo} onChange={handleChange}/>
                        </label>)
                      )}
                      {/* Advertencia de correo */}
                      <p className='advertencia'>
                        {(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo) && (<i className='bx bx-x-circle' ></i>)}
                        {(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo)? 'Los correos no coinciden o no introduce el correo':''}
                      </p>
                      <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      onClick={()=>setClickUser(pasosUser[3])}//al siguiente campo
                      type='button'
                      animate={{
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo)? 'var(--disabled-btn)':hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      disabled={(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo)? true:false}
                      >
                        <motion.i 
                        initial={{
                          x:10,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo)? 10:hover? 200:10,
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
                          x:(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo)? -200:hover? -29:-200,
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
                          <input type="password" name={index==0? 'contraseña':'confirmaContraseña'} value={index==0? formData.contraseña:formData.confirmaContraseña} onChange={handleChange} />
                        </label>
                      ))}
                      {/* Advertencia de contraseña */}
                      <p className='advertencia'>
                        {(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña) && (<i className='bx bx-x-circle' ></i>)}
                        {(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? "Las contraseñas no coinciden o la contraseña es vácio":""}
                      </p>
                      {/* btn submit */}
                      <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      // onClick={()=>clickBtn(true)}
                      type='submit'
                      animate={{
                        color:(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? '':hover? 'orange': '#fff',
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? 'var(--disabled-btn)':hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      disabled={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? true:false}
                      >
                        {/* tranferir la variant que establecemos */}
                        <motion.hr className='up-linea'
                      variants={lineaUpDown}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? '':'hover'}
                      ></motion.hr>
                      <motion.hr className='right-linea'
                      variants={lineaRightLeft}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? '':'hover'}
                      ></motion.hr>
                        Registrar
                        <motion.hr className='left-linea'
                      variants={lineaRightLeft}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? '':'hover'}
                      ></motion.hr>
                      <motion.hr className='under-linea'
                      variants={lineaUpDown}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña ||formData.confirmaContraseña)? '':'hover'}
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
        </form>
      </main>
    </>
  )
}

export default Registro
