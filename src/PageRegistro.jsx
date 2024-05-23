import React, { useState } from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
import "./PageRegistro.css"
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'
const Registro = () => {
  //pasa los propiedades a componente TituloPaginas
    const state={img:'src/img/bg5.png',title:"Registro",description:"Únete a los Mejores, Compite con Pasión"};
    //
    const items=["iniciar","registrar"];
    const txtInform=["nombre","apellidos",];
    const emails=["correo electrónico","confirma correo"]
    const pwds=["contraseña","confirma contraseña"]
    const ptoRegistro=[0,1,2,3]

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
      // Form data state
      const [formData, setFormData] = useState({
        nombreIS:'',
        contraseñaIS:'',
        nombreUsuario: '',
        nombre: '',
        apellidos: '',
        fechaN: new Date(),
        correo: '',
        confirmaCorreo: '',
        contraseña: '',
        confirmaContraseña: '',
    });
    const [message, setMessage] = useState(''); 
    const [message2, setMessage2] = useState(''); 

    const hoy =moment();//conseguir fecha de hoy
    const fecha=moment(formData.fechaN)//conseguir la fecha de nacimiento
    const diff = hoy.diff(fecha, 'years');//obtener la edad de usuario

    //actualizar la formulario
    const handleChange = (e) => {
      //conseguir los elementos de formulario,name se refiere a nombreUsuario,nombre,etc, value se refiere a los valores que introduce
        const { name, value } = e.target;
        //actualizar los valores de formData
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const submit = async (e) => {
      e.preventDefault()
      //si no introduce los datos o introduce sin válidos, no va a envivar los datos
        
        try {
          //conecta servidor virtual creado
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

            //manda nombre y contrase;a de usuario que iniciar sesi'on
            const response2 = await fetch('http://localhost:3001/confirma',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nombreIS:formData.nombreIS,
                contraseñaIS:formData.contraseñaIS,
              }),

            });

            const result2=await response2.json()
            //si la verificacion bien, se sale la msg con 'exito
            if (response2.ok) {
              console.log('Success:', 'Enviar para comprobar', result2);
              setMessage('Verificación exitosa');
          } else {
              console.error('Error:', 'Error en la verificación', result2);
              setMessage('Error en la verificación: ' + result2.error);
          }


        } catch (error) {
            console.error('Error:', 'Enviar erro '+error);
        }
    };

    // parte html
  return (
    <>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <main className='tabla-registro'>
        <form className='tabla' onSubmit={submit}>
          <div className='tabla-seleccion'>
            {/* secciones de cabecera de formulario, items que tiene usuario y administrador */}
            {items.map((seccion, index) =>(
              <motion.div 
              key={index}
              whileHover={{
                backgroundColor:seccion==click? 'var(--main-color2)':'var(--main-color)',
              }}
              animate={{
                backgroundColor:seccion==click? 'var(--main-color)':'#000',
                cursor:"pointer"
              }}
              className={seccion}
              onClick={()=>setClick(seccion)}
              >
                <p>{seccion=='iniciar'? 'INICIAR SESIÓN':'REGISTRO'}</p>
              </motion.div>
            ))}
          </div>
          
            {/* si elija la selección usuario, aparece su tabla */}
          {click=='iniciar' && !message?
          //parte de iniciar sesión
          <AnimatePresence>
          <motion.div className='tabla-user'>
            <motion.div
          variants={inputUser}
          initial='vamos'
          animate='quedamos'
          exit='nosvamos'>
            <label htmlFor="Nombre de usuario">
              <p>usuario</p>
              <input type="text" name='nombreIS' value={formData.nombreIS} onChange={handleChange}/>
            </label>
            <label htmlFor="pwd">
              <p>contraseña</p>
              <input type="password" name='contraseñaIS' value={formData.contraseñaIS} onChange={handleChange} />
            </label>
            {/* no tienes cuenta */}
            <p className='recordatorio' 
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)} 
            onClick={()=>{setClick('registrar')}}
            >
              ¿ no tienes cuenta ?
            </p>
              {/* btn de iniciar sesi'on */}
            <motion.button className='registro'
            onHoverStart={()=>setHover(true)}
            onHoverEnd={()=>setHover(false)}
            type='submit'
            animate={{
              color:(!formData.nombreIS || !formData.contraseñaIS)? '':hover? 'orange': '#fff',
              boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
              backgroundColor:(!formData.nombreIS || !formData.contraseñaIS)? 'var(--disabled-btn)':hover? 'var(--hoverbtn)':'var(--main-color)',
            }}
            disabled={(!formData.nombreIS || !formData.contraseñaIS)? true:false}
            >
              {/* tranferir la variant que establecemos */}
              <motion.hr className='up-linea'
            variants={lineaUpDown}
            initial='sinHover'
            animate={(!formData.nombreIS || !formData.contraseñaIS)? '':'hover'}
            ></motion.hr>
            <motion.hr className='right-linea'
            variants={lineaRightLeft}
            initial='sinHover'
            animate={(!formData.nombreIS || !formData.contraseñaIS)? '':'hover'}
            ></motion.hr>
              Iniciar Sessión
              <motion.hr className='left-linea'
            variants={lineaRightLeft}
            initial='sinHover'
            animate={(!formData.nombreIS || !formData.contraseñaIS)? '':'hover'}
            ></motion.hr>
            <motion.hr className='under-linea'
            variants={lineaUpDown}
            initial='sinHover'
            animate={(!formData.nombreIS || !formData.contraseñaIS)? '':'hover'}
            ></motion.hr>
            </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence> : 
        // mensaje de iniciar con 'existos
        click=='iniciar' && message? 
        <AnimatePresence>
        <motion.div className='tabla-user'>
          <motion.div
        variants={inputUser}
        initial='vamos'
        animate='quedamos'
        exit='nosvamos'>
          <motion.p className='exito' onClick={()=>setMessage('')}
          variants={inputUser}
          initial='vamos'
          animate='quedamos'
          exit='nosvamos'
          >{message}</motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence> :
            //parte de registro
         click=='registrar' && !message2?
        <AnimatePresence>
              <motion.div className='tabla-user'>
                  {/* si teine cuenta, iniciar sesi'on */}
                  { 
                  /* se aparezca los campos si elige los correspondientes pasos */
                  clickUser==pasosUser[0]? 
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
                        {(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña) && (<i className='bx bx-x-circle' ></i>)}
                        {(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? "Las contraseñas no coinciden o la contraseña es vácio":""}
                      </p>
                      {/* btn submit */}
                      <motion.button className='registro'
                      onHoverStart={()=>setHover(true)}
                      onHoverEnd={()=>setHover(false)}
                      // onClick={()=>clickBtn(true)}
                      type='submit'
                      animate={{
                        color:(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? '':hover? 'orange': '#fff',
                        boxShadow:hover? '1px 1px 10px var(--hoverbtn)':'none',
                        backgroundColor:(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? 'var(--disabled-btn)':hover? 'var(--hoverbtn)':'var(--main-color)',
                      }}
                      disabled={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? true:false}
                      >
                        {/* tranferir la variant que establecemos */}
                        <motion.hr className='up-linea'
                      variants={lineaUpDown}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? '':'hover'}
                      ></motion.hr>
                      <motion.hr className='right-linea'
                      variants={lineaRightLeft}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? '':'hover'}
                      ></motion.hr>
                        Registrar
                        <motion.hr className='left-linea'
                      variants={lineaRightLeft}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? '':'hover'}
                      ></motion.hr>
                      <motion.hr className='under-linea'
                      variants={lineaUpDown}
                      initial='sinHover'
                      animate={(formData.contraseña !== formData.confirmaContraseña || !formData.contraseña || !formData.confirmaContraseña)? '':'hover'}
                      ></motion.hr>
                      </motion.button>
                      </motion.div>
                    </AnimatePresence>
                  }
                
              </motion.div>
        </AnimatePresence> : null
          }
          {/* los punto de carrusel si elige */}
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
            key={click? click:""}//si ya pongamos click de usuario o administrador, aparece animaci'on
            >
              {/* si no hay cuenta, se aparezca los ptos */}
                {click=='iniciar'?  '': 
                  // ptos en registro
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
