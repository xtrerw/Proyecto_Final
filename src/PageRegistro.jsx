import React, { useState } from 'react'
import TituloPaginas from './componentes_paginas/tituloPaginas'
import "./PageRegistro.css"
import { color, motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Link, Navigate,useNavigate } from 'react-router-dom'

const Registro = () => {

  //pasa los propiedades a componente TituloPaginas
    const state={img:'src/img/bg5.png',title:"Registro",description:"Únete a los Mejores, Compite con Pasión"};
    const items=["iniciar","registrar"];
  // esconder y presente
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(!show);
  const openEye=(<svg className='ojo' onClick={handleShow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z" fill="#ffffff"></path> </g></svg>)
  const closeEye=(<svg className='ojo' onClick={handleShow} viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#ffffff"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#ffffff"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#ffffff"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#ffffff"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#ffffff"></path> </g></svg>)
    //elegir usuario o administrador
    const [click,setClick]=useState(items[0]);
    //los pasos de registro
    const inputUser = {//animacion de input
      vamos: { opacity: 0, x: 100 },
      quedamos: { opacity: 1, x: 0 },
      nosvamos: { opacity: 0, x: -100 }
    };
    //animacion de hover btn
    const [hover,setHover]=useState(false)
      // Form data state
      const [formData, setFormData] = useState({
        nombreIS:'',
        contraseñaIS:'',
        nombreUsuario: '',
        correo:'',
        contraseña: '',
        confirmaContraseña: '',
    });
    const [message, setMessage] = useState(''); 
    const [message2, setMessage2] = useState('');
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
        if (!formData.contraseña.trim() || !formData.confirmaContraseña.trim() || !formData.nombreUsuario.trim() || !formData.correo.trim()) {
          setMessage2("Existe error de registro");
          return;
      }
        if (formData.contraseña !== formData.confirmaContraseña) {
          setMessage2("Existe error de registro");
          return;
      }
        const respone=await fetch('http://localhost:3001/registro',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombreUsuario: formData.nombreUsuario,
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
          <form className='tabla-user' onSubmit={submitIS}>
            <div>
            <label htmlFor="Nombre de usuario">
              <p>usuario</p>
              <input type="text" name='nombreIS' value={formData.nombreIS} onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === " ") {
                    e.preventDefault(); 
                }
              }}
              />
            </label>
            <label htmlFor="pwd">
              <p>contraseña</p>
              <input type={show? 'password' : 'text'} name='contraseñaIS' value={formData.contraseñaIS} onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === " ") {
                    e.preventDefault(); 
                }
              }}
              />
              {show ? openEye : closeEye}
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
              Iniciar Sesión
            </motion.button>
            <p className='recordatorio' 
            onClick={()=>{setClick('registrar')}}
            >
              ¿ no tienes cuenta ?
            </p>
            </div>
          </form>: 
        // mensaje de iniciar con 'existos
        click=='iniciar' && message=='Verificación exitosa'? 
        <div
        className='msg-registro'
        onClick={()=>setMessage('')}>
          <p className='exito'>{message}</p>
        </div> :
      // si usuario q introduce no está en base de datos
      click=='iniciar' && message=='Carece de credenciales válidas'? 
          <div className='msg-registro' onClick={()=>setMessage('')}>
          {/* icon éxito */}
            <p className='error'>{message}</p>
          </div>:
            //parte de registro
         click=='registrar' && !message2?
              <form className='tabla-user' onSubmit={submitRegistro}>
                <div>
                  <label htmlFor="">
                    <p>usuario</p>
                    <input type="text" name='nombreUsuario' value={formData.nombreUsuario} onChange={handleChange} 
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                          e.preventDefault(); 
                      }
                    }}
                  />
                  </label>
                  <label htmlFor="">
                    <p>correo</p>
                    <input type="email" name='correo' value={formData.correo} onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                            e.preventDefault(); 
                        }
                      }}
                    />
                  </label>
                  <label htmlFor="">
                    <p>contraseña</p>
                    <input type={show? 'password':'text'} name='contraseña' value={formData.contraseña} onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                            e.preventDefault(); 
                        }
                      }}
                    />
                  </label>
                  <label htmlFor="">
                    <p>confirma contraseña</p>
                    <input type={show? 'password':'text'} name='confirmaContraseña' value={formData.confirmaContraseña} onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                            e.preventDefault(); 
                        }
                      }}
                    />
                   {show ? openEye : closeEye}
                  </label>
                  <button type='submit' className='registro'>registrar</button>
                </div>
                <p className={message2=='Se ha registrado con exito'? 'exito': 'error'} onClick={()=>setMessage2('')}>{message2}</p>
              </form>:
          // msg con éxitos
          click=='registrar' && message2? 
            <div className='msg-registro'>
              {/* recordatorio */}
              <p className={message2=='Se ha registrado con exito'? 'exito': 'error'} onClick={()=>setMessage2('')}>{message2}</p>
              </div>
          : null
          }
        </div>
      </main>
    </>
  )
}

export default Registro
