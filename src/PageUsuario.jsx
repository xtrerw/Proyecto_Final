import React, { useState } from 'react'
import "./PageUsuario.css"
import { color, motion } from 'framer-motion'
import { actualizarDatos} from './actions/action'
import { useDispatch } from 'react-redux'
const PageUsuario = (propsUser) => {
    //aparece la contraseña
    const[lock1,setLock1]=useState(true)
    const[lock2,setLock2]=useState(true)
    //introduce informaciones de nuevo
    const[form,setForma]=useState({
        email:propsUser.email,
<<<<<<< HEAD
        pwd: null,
        pwdConfirma: null,
=======
        pwd: "",
        pwdConfirma: "",
        direccion: propsUser.direccion,
>>>>>>> tryAgain
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
<<<<<<< HEAD
    const [error,setError]=useState(false)
    // pondrá los borders rojo de input
    const errorBorder={
        tieneError:{
            border:error? '2px solid var(--hoverbtn)':'none',
            color:error? 'var(--hoverbtn)':'none',
=======
    const [error,setError]=useState(null)
    //los msgs errores
    const errorMSG={
        tieneError:{
            display:error==null?'none':'block',
            color:error==null? 'none':'var(--hoverbtn)',
>>>>>>> tryAgain
        }
    } 
    //REDUX desp'ues de importar acción
    const dispatch=useDispatch()
    const submitUser = async(e)=>{
        e.preventDefault();
<<<<<<< HEAD
        setError(false)
=======
        setError(null)
        if (!form.direccion?.trim()) {
            setError("Introduce tu dirección")
            return
        }
        if (!form.pwd?.trim()) {
            setError("Introduce tu contraseña nueva")
            return
        }
>>>>>>> tryAgain
        //si condiciones de modificar los datos sin válida
        if (form.pwd!=form.pwdConfirma)  {
            return setError("La contraseña confirmada no es correcto");
        } else if (!form.email) {
            return console.log('error email')
        }
        //si no rellenar contraseña,solo manda correo
        const param = {
            id: propsUser.id, 
            user:propsUser.user,
            email: form.email, 
<<<<<<< HEAD
=======
            direccion: form.direccion, 
            pwd:form.pwd
>>>>>>> tryAgain
        };
        //actualizar perfil
        try {
            const response=await fetch('http://localhost:3001/modifica',{
            //uso metodo de PUT
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param)
            })
            const resulta=await response.json()

            if (response.ok) {
                console.log('modificar los datos con éxito'+resulta);
                //inserta los datos y los pasa a app.jsx
                dispatch(actualizarDatos(resulta))                
            }
        } catch (error) {
            console.error('error de submit'+error);
        }
    }
    //cerrar sesión
    const handleLogout = () => {
        // quitar objeto de localStorage
        localStorage.removeItem('user')
        // Redirigir a la página de inicio o de login
        window.location.href = '/Registro'; // Asegúrate de tener la ruta '/login' configurada en tu enrutador
    };
<<<<<<< HEAD
    //lista de equipos
    //muestra equipos
    const[sinEquipos,setSinEquipos]=useState([])
    useEffect(()=>{
        fetch("http://localhost:3001/sinEquipos")
        .then(response => response.json())
        .then(data=>{setSinEquipos(data)})
        .catch(error => console.error(error))
    },[])
    //elegir equipos
    const[elegir,setElegirEquipo]=useState([]);
    const addEquipo = (element) => {
        setElegirEquipo([...elegir, element]);
    };
    console.log(elegir);
    //enviar los equipos elegidos
    const enviarEquiposElegidos=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch('http://localhost:3001/sinEquipos',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: propsUser.id,
                    equipos: elegir,
                })
            }) 
            const resulta=await response.json();
            if (response.ok) {
                alert(resulta);
            }
        } catch (error) {
            console.error('error', error)
        }
        
    }
    //item de menu
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
=======



>>>>>>> tryAgain
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
                {propsUser.user}
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
                {/* formulario de modifica */}
                <form className='tus-datos' onSubmit={submitUser}>
<<<<<<< HEAD
                    
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
                        <button type="submit" className='usuario-btn'>Guardar</button>
                        <button type="button" className='usuario-btn'onClick={handleLogout}>cerrar sesión</button>
=======
                    <div className='item-usuario'>
                        <div className='usuario-iniciar'>
                            <i className='bx bx-user' ></i>
                            <input type="text" name='user'value={propsUser.user} style={{
                                color:"#000",
                                backgroundColor:"#fff",                                  
                            }} disabled />
                        </div>
                        <div className='usuario-iniciar'>
                            <i className='bx bx-envelope'></i>
                            <input type="email" name='email' value={form.email} onChange={handleChange} placeholder='Correo'/>
                        </div>
                        <div className='usuario-iniciar'>
                            <i className='bx bx-home-alt-2'></i>
                            <input type="text" name='direccion' placeholder='Dirección' value={form.direccion} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='item-usuario'>
                        <div className='usuario-iniciar'>
                            <i style={{ cursor:'pointer'}} 
                            className={
                                lock1? 'bx bx-lock':'bx bx-lock-open'
                            } 
                            onClick={()=>setLock1(!lock1)}></i>
                            <input type={
                                lock1? 'password':'text'
                            } name='pwd' value={form.pwd} onChange={handleChange} placeholder='Estabelece tu contraseña nueva'/>
                        </div>
                        <div className='usuario-iniciar'>
                            <i style={{ cursor:'pointer'}} 
                            className={
                                lock2? 'bx bx-lock':'bx bx-lock-open'
                            } 
                            onClick={()=>setLock2(!lock2)}></i>
                            <input type={
                                lock2? 'password':'text'
                            } name='pwdConfirma' value={form.pwdConfirma} onChange={handleChange} placeholder='Confirma tu contraseña'
                            />
                        </div>
                        <div className='usuario-btns'>
                            <button type="submit" className='usuario-btn'>Guardar</button>
                            <button type="button" className='usuario-btn'onClick={handleLogout}>cerrar sesión</button>
                        </div>
                        <p className='error-modifica' style={errorMSG.tieneError}>{error}</p>
>>>>>>> tryAgain
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
<<<<<<< HEAD
                {equipos.length>0?
                //si teienes equipos, se sale equipos
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
                //si no tienes equipos, se sale lista de equipos
                <form className='sin-equipo' onSubmit={enviarEquiposElegidos}>
                    <div className='elegir-equipo'>
                        {sinEquipos.map((equipo,index)=>
                            <motion.div key={index} className='lista-equipo'
                                whileHover={{
                                    backgroundColor:'var(--main-color)',
                                    color:'#fff'
                                }}
                                onClick={()=>{ 
                                    if (elegir.find(item => item === equipo)) {
                                        //cancelar el equipo elegido
                                        setElegirEquipo(elegir.filter(item => item.equipo !== equipo.equipo))
                                    }else{
                                        //elegir el equipo
                                        addEquipo(equipo)
                                    }
                                    }}
                                animate={{
                                    backgroundColor:elegir.find(item => item === equipo)? 'var(--main-color)':'#fff',
                                    color:elegir.find(item => item === equipo)? '#fff':'var(--main-color)',
                                }}
                            >
                                <img src={`../${equipo.img}`} alt="" />
                                {equipo.equipo} / {equipo.tipoJuego}
                            </motion.div>
                        )}   
                    </div> 
                    <button type='submit' className='usuario-btn'>Confirma unirse</button>
                </form> 
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
            // variants={itemRight}
            initial={{
                borderRadius:"20%",
                opacity:0
            }}
            ></motion.div>
            <motion.div className='usuario-ptos'
            // variants={itemRight}
            initial={{
                borderRadius:"20%",
                opacity:0
            }}
            ></motion.div>
        </motion.section>
=======
            </motion.div>
        </section>
>>>>>>> tryAgain
    </main>
  )
}

export default PageUsuario
