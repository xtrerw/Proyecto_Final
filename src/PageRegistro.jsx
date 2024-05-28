import React, { useState } from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
import "./PageRegistro.css"
import { color, motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'
const Registro = () => {
  //pasa los propiedades a componente TituloPaginas
    const state={img:'src/img/bg5.png',title:"Registro",description:"Únete a los Mejores, Compite con Pasión"};
    //
    const scrollbg=['../src/img/scroll1.png', '../src/img/scroll2.png', '../src/img/scroll3.png', '../src/img/scroll4.png', '../src/img/scroll5.png'];
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
    //animacion de path icon con éxito
    const iconExito={
      sinExito:{
        // border de path de estado inicial y el ancho de esto son 0
        pathLength:0,
        strokeWidth:0,
      },
      exito:{
        // establece animación y su tiempo
        pathLength:2,
        strokeWidth:2,
        transition:{
          duration:2,
          delay:0.2
        }
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

    const submitIS = async (e) => {
      e.preventDefault()
      //si no introduce los datos o introduce sin válidos, no va a envivar los datos
        
        try {
            //manda nombre y contrase;a de usuario que iniciar sesi'on
            //conecta el servidor virtual que creamos
            const response = await fetch('http://localhost:3001/iniciar',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nombreIS:formData.nombreIS,
                contraseñaIS:formData.contraseñaIS,
              }),

            });

            const result=await response.json()
            //si la verificacion bien, se sale la msg con 'exito
            if (response.ok) {
              console.log('Enviar para comprobar', result);
              setMessage('Verificación exitosa');
          } else {
              console.error('Error en la verificación', result);
              setMessage('Carece de credenciales válidas');
          }
       } catch (error) {
           console.error('Error:', 'Enviar erro '+error);
        }
    };
    //enviar el formulario de registro
    const submitRegistro= async(e) => {
      e.preventDefault();
      try {
        const respone=await fetch('http://localhost:3001/registro',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombreUsuario: formData.nombreUsuario,
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            fechaN: formData.fechaN,
            correo: formData.correo,
            contraseña: formData.contraseña
          })
        });
        const result=await respone.json();
        if (respone.ok) {
          console.log('Registro con éxito'+result);
          setMessage2('Ya registra usted');
        }else{
          console.error('Error en la verificación'+result);
          setMessage2('Existe error de registro');
        } 
      } catch (error) {
        console.error('Error de enviar',error)
      }
    };
    // parte html
  return (
    <>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <main className='tabla-registro'>
        <div className='tabla'>
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
          <motion.form className='tabla-user' onSubmit={submitIS}>
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
          </motion.form>
        </AnimatePresence> : 
        // mensaje de iniciar con 'existos
        click=='iniciar' && message=='Verificación exitosa'? 
        <AnimatePresence>
          <motion.div
          className='msg-registro'
          onClick={()=>setMessage('')}

        variants={inputUser}
        initial='vamos'
        animate='quedamos'
        exit='nosvamos'>
           {/* icon éxito */}
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#90f1e9" strokeWidth="" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                variants={iconExito}
                initial='sinExito'
                animate='exito'
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></motion.path>
                <motion.polyline
                variants={iconExito}
                initial='sinExito'
                animate='exito'
                points="22 4 12 14.01 9 11.01"></motion.polyline>
                </svg>
          <motion.p 
          className='exito' 
          variants={inputUser}
          initial='vamos'
          animate='quedamos'
          exit='nosvamos'
          >{message}</motion.p>
        </motion.div>
      </AnimatePresence> :
      // si usuario q introduce no está en base de datos
      click=='iniciar' && message=='Carece de credenciales válidas'? 
      
        <AnimatePresence>
          <motion.div
          className='msg-registro'
          onClick={()=>setMessage('')}

          variants={inputUser}
          initial='vamos'
          animate='quedamos'
          exit='nosvamos'>
          {/* icon éxito */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f93434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <motion.circle cx="12" cy="12" r="10"
                variants={iconExito}
                initial='sinExito'
                animate='exito'
              ></motion.circle>
              <motion.line x1="15" y1="9" x2="9" y2="15"
                variants={iconExito}
                initial='sinExito'
                animate='exito'
              ></motion.line>
              <motion.line x1="9" y1="9" x2="15" y2="15"
                variants={iconExito}
                initial='sinExito'
                animate='exito'
              ></motion.line>
            </svg>
            <motion.p 
            className='error' 
            variants={inputUser}
            initial='vamos'
            animate='quedamos'
            exit='nosvamos'
            >{message}</motion.p>
          </motion.div>
        </AnimatePresence>
      
      :
            //parte de registro
         click=='registrar' && !message2?
        <AnimatePresence>
              <motion.form className='tabla-user' onSubmit={submitRegistro}>
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
                          x:0,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:(diff<18 || !formData.nombreUsuario)? 0:hover? 200:0,
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
                          x:(diff<18 || !formData.nombreUsuario)? -200:hover? 0:-200,
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
                          x:0,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:(!formData.apellidos || !formData.nombre)? 0:hover? 200:0,
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
                          x:(!formData.apellidos || !formData.nombre)? -200:hover? 0:-200,
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
                          x:0,
                          rotate:"180deg",
                          // opacity:1
                        }}
                        animate={{
                          x:(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo)? 0:hover? 200:0,
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
                          x:(formData.correo !== formData.confirmaCorreo || !formData.correo || !formData.confirmaCorreo)? -200:hover? 0:-200,
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
              </motion.form>
        </AnimatePresence> :
          // msg con éxitos
          click=='registrar' && message2? 
          <AnimatePresence>
            <motion.div
            className='msg-registro'
            variants={inputUser}
            initial='vamos'
            animate='quedamos'
            exit='nosvamos'>
              {/* icon éxito */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#90f1e9" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                variants={iconExito}
                initial='sinExito'
                animate='exito'
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></motion.path>
                <motion.polyline 
                variants={iconExito}
                initial='sinExito'
                animate='exito'
                points="22 4 12 14.01 9 11.01"></motion.polyline>
                </svg>
              {/* recordatorio */}
              <motion.p className='exito' onClick={()=>setMessage2('')}
              variants={inputUser}
              initial='vamos'
              animate='quedamos'
              exit='nosvamos'
              >{message2}</motion.p>
              </motion.div>
          </AnimatePresence>: null
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
              {/* si no hay cuenta y no tramita registro, se aparezca los ptos */}
                {(click=='registrar' && !message2)?   
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
                  ) : null
                }
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}

export default Registro
