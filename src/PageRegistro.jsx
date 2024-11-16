import React, { useState } from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
import "./PageRegistro.css"
import { color, motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import moment from 'moment'
import { Link, Navigate,useNavigate } from 'react-router-dom'

const Registro = () => {

  //pasa los propiedades a componente TituloPaginas
    const state={img:'src/img/bg5.png',title:"Registro",description:"Únete a los Mejores, Compite con Pasión"};
    const items=["iniciar","registrar"];
<<<<<<< HEAD
    const txtInform=["nombre","apellidos",];
    const emails=["correo electrónico","confirma correo"]
    const pwds=["contraseña","confirma contraseña"]
    const ptoRegistro=[0,1,2,3]

=======
  // esconder y presente
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(!show);
  const openEye=(<svg className='ojo' onClick={handleShow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z" fill="#ffffff"></path> </g></svg>)
  const closeEye=(<svg className='ojo' onClick={handleShow} viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#ffffff"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#ffffff"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#ffffff"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#ffffff"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#ffffff"></path> </g></svg>)
>>>>>>> tryAgain
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
    //para enviar id de usuario verificado
    const nav=useNavigate()
    const submitIS = async (e) => {
      e.preventDefault()
      //si no introduce los datos o introduce sin válidos, no va a envivar los datos
        
        try {
            //manda nombre y contrase;a de usuario que iniciar sesi'on
            //conecta el servidor virtual que creamos
            const response = await fetch(`http://localhost:3001/`,{
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
            //si la verificacion bien, se sale la msg con 'exito, o sea el código response es 200
            if (response.ok) {
              console.log('Enviar para comprobar', result);
              setMessage('Verificación exitosa');
              //navegar a la p'agina principal y manda id a all'i
              //manda id a la página que quiera
              nav(`/`,{state:{userEquipo:result}})
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
            contraseña: formData.contraseña,
            img:'src/img/defecto.png',
            ptos:0
          })
        });
        const result=await respone.json();
        if (respone.ok) {
          console.log('Registro con éxito'+result);
          setMessage2('Se ha registrado con exito');
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
              <input type="text" name='nombreIS' value={formData.nombreIS} onChange={handleChange} placeholder='Introduce tu nombre del usuario'/>
            </label>
            <label htmlFor="pwd">
              <p>contraseña</p>
              <input type="password" name='contraseñaIS' value={formData.contraseñaIS} onChange={handleChange} placeholder='Introduce tu contraseña'/>
            </label>
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
              Iniciar Sesión
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
            {/* eres administrador
            <Link to={'/Administrador'} style={{color:'#fff'}}>
              <p className='admin' 
              >
                ¿ eres administrador ?
              </p>
            </Link> */}
            {/* no tienes cuenta */}
            <p className='recordatorio' 
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
            onClick={()=>{setClick('registrar')}}
            >
              ¿ no tienes cuenta ?
            </p>
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
                        <input type="date" name='fechaN' value={formData.fechaN} placeholder='Introduce la fecha de nacimiento' onChange={handleChange}/>
                      </label>
                      <label htmlFor="nombreUser">
                        <p>nombre del usuario</p>
                        <input type="text" name='nombreUsuario' placeholder='Introduce tu nombre' value={formData.nombreUsuario} onChange={handleChange}/>
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
                        <input type="text" name={input} value={index==0? formData.nombre: formData.apellidos} onChange={handleChange} placeholder={`Introduce tu ${input}`}/>
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
                          <input type="email" name={index==0? 'correo':'confirmaCorreo'} value={index==0? formData.correo:formData.confirmaCorreo} onChange={handleChange} placeholder={`${email}`}/>
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
                          <input type="password" name={index==0? 'contraseña':'confirmaContraseña'} value={index==0? formData.contraseña:formData.confirmaContraseña} onChange={handleChange} placeholder={`${pwd}`}/>
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
