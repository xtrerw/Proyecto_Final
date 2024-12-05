import React, { useState, useEffect } from 'react'
import './PageUsuario.css'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { actualizarDatos } from './actions/action'
import axios from 'axios'

const PageUsuario = (propsUser) => {
    const [lock1, setLock1] = useState(true)
    const [lock2, setLock2] = useState(true)

    const [form, setForma] = useState({
        email: propsUser.email,
        pwd: "",
        pwdConfirma: "",
        direccion: propsUser.direccion,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForma({
            ...form,
            [name]: value,
        })
    }

    const [error, setError] = useState(null)
    const errorMSG = {
        tieneError: {
            display: error == null ? 'none' : 'block',
            color: error == null ? 'none' : 'var(--hoverbtn)',
        }
    }

    const dispatch = useDispatch()

    const submitUser = async (e) => {
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
        if (form.pwd !== form.pwdConfirma) {
            return setError("La contraseña confirmada no es correcta");
        } else if (!form.email) {
            return console.log('error email')
        }

        const param = {
            id: propsUser.id,
            user: propsUser.user,
            email: form.email,
            direccion: form.direccion,
            pwd: form.pwd
        };

        try {
            const response = await fetch('http://localhost:3001/modifica', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(param)
            })
            const resulta = await response.json()

            if (response.ok) {
                console.log('modificar los datos con éxito' + resulta);
                dispatch(actualizarDatos(resulta))
            }
        } catch (error) {
            console.error('error de submit' + error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        window.location.href = '/Registro';
    };

    // Nuevo estado para los equipos
    const [equipos, setEquipos] = useState([])
    const [equipoActual, setEquipoActual] = useState(null)

    // Función para obtener los equipos y el equipo actual
    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const equiposResponse = await axios.get('http://localhost:3001/equipos')
                setEquipos(equiposResponse.data)
                const equipoResponse = await axios.get(`http://localhost:3001/equipo/${propsUser.id}`)
                setEquipoActual(equipoResponse.data)
            } catch (error) {
                console.error('Error al obtener equipos:', error)
            }
        }

        fetchEquipos()
    }, [propsUser.id])

    // Maneja la acción de unirse al equipo
    const handleUnirseEquipo = async (equipoId) => {
        try {
            const response = await axios.post('http://localhost:3001/unirseEquipo', {
                jugadorId: propsUser.id,
                equipoId,
            })

            if (response.data) {
                setEquipoActual(response.data) // Actualiza el equipo actual en el estado
            }
        } catch (error) {
            console.error('Error al unirte al equipo', error)
        }
    }

    return (
        <main className='usuario'>
            <section className='usuario-tarjeta'>
                <motion.div className='usuario-nombre'
                    animate={{
                        opacity: [0, 1],
                        y: [-20, 0]
                    }}
                    transition={{
                        delay: 1,
                        duration: 1,
                        ease: "anticipate"
                    }}
                >
                    {propsUser.user}
                </motion.div>
                <motion.div className='usuario-infor'
                    animate={{
                        opacity: [0, 1],
                        y: [-20, 0]
                    }}
                    transition={{
                        duration: 2,
                        ease: "backInOut"
                    }}>
                    <form className='tus-datos' onSubmit={submitUser}>
                        <div className='item-usuario'>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-user' ></i>
                                <input type="text" name='user' value={propsUser.user} style={{
                                    color: "#000",
                                    backgroundColor: "#fff",
                                }} disabled />
                            </div>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-envelope'></i>
                                <input type="email" name='email' value={form.email} onChange={handleChange} placeholder='Correo' />
                            </div>
                            <div className='usuario-iniciar'>
                                <i className='bx bx-home-alt-2'></i>
                                <input type="text" name='direccion' placeholder='Dirección' value={form.direccion} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='item-usuario'>
                            <div className='usuario-iniciar'>
                                <i style={{ cursor: 'pointer' }}
                                    className={
                                        lock1 ? 'bx bx-lock' : 'bx bx-lock-open'
                                    }
                                    onClick={() => setLock1(!lock1)}></i>
                                <input type={
                                    lock1 ? 'password' : 'text'
                                } name='pwd' value={form.pwd} onChange={handleChange} placeholder='Establece tu contraseña nueva' />
                            </div>
                            <div className='usuario-iniciar'>
                                <i style={{ cursor: 'pointer' }}
                                    className={
                                        lock2 ? 'bx bx-lock' : 'bx bx-lock-open'
                                    }
                                    onClick={() => setLock2(!lock2)}></i>
                                <input type={
                                    lock2 ? 'password' : 'text'
                                } name='pwdConfirma' value={form.pwdConfirma} onChange={handleChange} placeholder='Confirma tu contraseña'
                                />
                            </div>
                            <div className='usuario-btns'>
                                <button type="submit" className='usuario-btn'>Guardar</button>
                                <button type="button" className='usuario-btn' onClick={handleLogout}>cerrar sesión</button>
                            </div>
                            <p className='error-modifica' style={errorMSG.tieneError}>{error}</p>
                        </div>
                    </form>
                    <motion.div className='usuario-img'
                        style={{
                            backgroundImage: `url(${propsUser.img})`
                        }}
                        animate={{
                            boxShadow: ["0px 0px 5px #fff", "0px 0px 20px #fff", "0px 0px 5px #fff"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                        }}
                    ></motion.div>
                </motion.div>

                {/* Div con la lista de equipos */}
                <div className="usuario-equipos">
                    <h3>Equipos Disponibles</h3>
                    {equipoActual ? (
                        <div>
                            <p>Estás en el equipo: <strong>{equipoActual.equipo}</strong></p>
                            <img src={equipoActual.img} alt={equipoActual.equipo} width="100" />
                        </div>
                    ) : (
                        <p>No estás en ningún equipo.</p>
                    )}

                    <ul>
                        {equipos.map((equipo) => (
                            <li key={equipo._id}>
                                <p>{equipo.equipo}</p>
                                <img src={equipo.img} alt={equipo.equipo} width="50" />
                                <button 
                                    onClick={() => handleUnirseEquipo(equipo._id)} 
                                    disabled={equipoActual && equipoActual._id === equipo._id}
                                >
                                    {equipoActual && equipoActual._id === equipo._id ? 'Ya estás en este equipo' : 'Unirse'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    )
}

export default PageUsuario;
