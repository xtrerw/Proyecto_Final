import React, { useEffect, useState } from 'react'
import "./PageUsuario.css"
import { color, motion } from 'framer-motion'
import { actualizarDatos} from './actions/action'
import { useDispatch } from 'react-redux'
const PageUsuario = (propsUser) => {
    //conseguir los quipos que user tiene
    const[equipos,setEquipos]=useState([])
    useEffect(()=>{
        if (Array.isArray(propsUser.equipos)) {
            setEquipos(propsUser.equipos)
        }else {
            setEquipos([]); 
        }
    },[propsUser])
    //cambiar los icones a lo largo de elegir el equipo
    const[team,setTeam]=useState()
    //introduce informaciones de nuevo
    const[form,setForma]=useState({
        email:propsUser.email,
        pwd: propsUser.pwd,
        pwdConfirma: propsUser.pwd,
    })
    //introduce input
    const handleChange = (e) => {
        const {name,value}=e.target

        setForma({
            ...form,
            [name]:value,
        })
    }
    //funcion de submit
    //si encuentra los error
    const [error,setError]=useState(false)
    // pondrá los borders rojo de input
    const errorBorder={
        tieneError:{
            border:error? '2px solid var(--hoverbtn)':'none',
            color:error? 'var(--hoverbtn)':'none',
        }
    } 
    //REDUX desp'ues de importar acción
    const dispatch=useDispatch()
    const submitUser = async(e)=>{
        e.preventDefault();
        setError(false)
        //si condiciones de modificar los datos sin válida
        if (form.pwd!=form.pwdConfirma || !form.pwd || !form.pwdConfirma)  {
            return setError(true);
        } else if (!form.email) {
            return console.log('error email')
        } else if (!form.user) {
            return console.log('error user');
        }
        try {
            const response=await fetch('http://localhost:3001/modifica',{
            //uso metodo de PUT
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id:propsUser.id,//para actualizar los datos según id
                    email:form.email,
                    pwd:form.pwd,
                })
            })
            const resulta=await response.json()

            if (response.ok) {
                //inserta los datos y los pasa a app.jsx
                dispatch(actualizarDatos(resulta))                
            }
        } catch (error) {
            console.error('error de submit'+error);
        }
    }
    //cerrar sesión
    const handleLogout = () => {
    
        // Redirigir a la página de inicio o de login
        window.location.href = '/Registro'; // Asegúrate de tener la ruta '/login' configurada en tu enrutador
    };
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
    console.log(equipos);
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
                    {equipos.length>0?
                    itemMenu.map((item,index)=>(
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
                        )): itemMenu.map((item,index)=>
                            index<2 &&
                            
                            (<motion.div key={index} className='item' onClick={()=>{setItem(item)}}
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
                            </motion.div> ))}
                </div>
                {/* formulario de modifica */}
                <form className='tus-datos' onSubmit={submitUser}>
                    
                    {menu=='mis datos'? 
                        <div className='item-usuario'>
                            <h2>
                                {menu}
                            </h2>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-user' ></i>
                                <input type="text" name='user'value={propsUser.user} style={{
                                    color:"#000",
                                    backgroundColor:"#fff",                                  
                                }} disabled />
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
                            <motion.div className='usuario-iniciar'
                             // si hay error, llamará a variente de estilo de error
                                variants={errorBorder}
                                animate='tieneError'
                            >
                                <i className='bx bx-lock'></i>
                                <input type='password' name='pwd' value={form.pwd} onChange={handleChange} placeholder='Estabelece tu contraseña nueva'/>
                            </motion.div>
                            <motion.div className='usuario-iniciar'
                            // si hay error, llamará a variente de estilo de error
                                variants={errorBorder}
                                animate='tieneError'
                            >
                                <i className='bx bx-lock'></i>
                                <input type='password' name='pwdConfirma' value={form.pwdConfirma} onChange={handleChange} placeholder='Confirma tu contraseña'
                                />
                            </motion.div>
                        </div> :
                         menu=='mis equipos'?
                         <div className='item-usuario'>
                             <h2>
                                {menu}
                            </h2>
                            {equipos.map((t,index)=>
                            <motion.div key={index} className='usuario-iniciar'
                                whileHover={{
                                    cursor: 'pointer',
                                    color: '#fff',
                                    backgroundColor:team==t.equipo?  'var(--main-color)':'var(--hoverbtn)',
                                }}
                                onClick={()=>{
                                    if (team==t.equipo) {
                                        setTeam(null)
                                    }else{
                                        setTeam(t.equipo); 
                                    }
                                }}
                                animate={{
                                    color:team==t.equipo? '#fff':'var(--hoverbtn)',
                                    backgroundColor:team==t.equipo? 'var(--hoverbtn)':'#fff',
                                }}
                            >
                                <i className='bx bx-group'></i>
                                {t.equipo}
                            </motion.div>)}
                        </div> : null}
                    
                    <div className='usuario-btns'>
                        <button type="submit" className='guardar'>Guardar</button>
                        <button type="submit" className='cancelar'onClick={handleLogout}>cerrar sesión</button>
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
                {equipos.length>0?
                equipos.map((eq,index)=>
                    <motion.div className='equipo-img' key={index}
                        style={{
                            backgroundImage: `url(../${eq.img})`
                        }}
                        initial={{
                            scale: 1,
                        }}
                        animate={{
                            scale:eq.equipo==team? 1.2:1,
                            rotate:eq.equipo==team? 360:0,
                        }}
                    ></motion.div>
                ):
                <div className='sin-equipo'>
                    <motion.p
                    whileHover={{
                        scale:1.1,
                        borderBottom:'2px solid',
                    }}
                    transition={{
                        duration:0.3,
                        ease:'circInOut',
                    }}
                    >No tienes equipos<i className='bx bx-right-arrow-alt'></i></motion.p>    
                </div> 
                }
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
                <p>{propsUser.ptos} <br /> Ptos</p>
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
