import React, { useState } from 'react'
import "./PageUsuario.css"
import { motion } from 'framer-motion'
import { actualizarDatos} from './actions/action'
import { useDispatch } from 'react-redux'
const PageUsuario = (propsUser) => {
    //aparece la contraseña
    const[lock1,setLock1]=useState(true)
    const[lock2,setLock2]=useState(true)
    //conseguir los pedidios del usuario
    const [pedido,setPedido]=useState([]);
    //introduce informaciones de nuevo
    const[form,setForma]=useState({
        email:propsUser.email,
        pwd: "",
        pwdConfirma: "",
        direccion: propsUser.direccion,
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
    const [error,setError]=useState(null)
    //los msgs errores
    const errorMSG={
        tieneError:{
            display:error==null?'none':'block',
            color:error==null? 'none':'var(--hoverbtn)',
        }
    } 
    //REDUX desp'ues de importar acción
    const dispatch=useDispatch()
    const submitUser = async(e)=>{
        e.preventDefault();
        setError(null)
        if (!form.direccion?.trim()) {
            setError("Introduce tu dirección")
            return
        }
        if (!form.pwd?.trim()) {
            setError("Introduce tu contraseña nueva")
            return
        }
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
            direccion: form.direccion, 
            pwd:form.pwd
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

    const obtenerPedido = async()=>{
        console.log(propsUser.id);
        
        try {
           
           
            //metodo get
            const response = await fetch(`http://localhost:3001/?id=${propsUser.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result= await response.json()
           
                setPedido(result)
           
        } catch (error) {
            console.log(error);
            
        }
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
            </motion.div>
                <button className='btn-ver' onClick={obtenerPedido}>
                    ver pedido
                </button>
                {pedido.map((item, index) => (
                <div key={index} className='ver-pedido'>
                    <p>Nombre: {item.nombre}</p>
                    <p>Precio: {item.precio}</p>
                    <p>Cantidad: {item.cantidad}</p>
                </div>
            ))}
        </section>
    </main>
  )
}

export default PageUsuario
