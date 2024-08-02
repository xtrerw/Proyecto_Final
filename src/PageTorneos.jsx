
import { useEffect, useState } from "react";
import "./PageTorneos.css"
import TituloPaginas from './componentes_paginas/tituloPaginas';
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useParams } from "react-router-dom";
const Torneos = () => {
    const state={img:'../src/img/bg3.png',title:"Torneos",description:"Alcanza la victoria"};
    const [equipos, setEquipos]=useState([]);
    //lista equipo para agregar
    const [listaEquipo, setLista]=useState([]);
    //add equipo
    const [isAdd,addEquipo]=useState(false);
    const handleClick = () => {
        addEquipo(true);
    };
    //confirmar administrador
    const [isAdmin,setAdmin] = useState(false);
    //conseguir juego que user elegir
    const {id}=useParams();
    const quitaClick = () => {
        addEquipo(false);
        setAdmin(false);
    };
    //equipos que hay en torneos
    useEffect(()=>{
        fetch('http://localhost:3001/torneos')
        .then(response=>response.json())
        .then((data)=>{
            const nombres = data.find(torneo => torneo.tipoJuego.toString() == id); // conseguir los nombre de equipos
            if (nombres) {
                setEquipos(nombres.equipos); 
            }
          })
        .catch((error)=>console.error("Error de conseguir los datos "+error));
      },[id])

       //lista de equipos que puede elegir
    useEffect(() => {
        fetch('http://localhost:3001/equipos')
            .then(response => response.json())
            .then((data) => {
                //equipos.some es para que filtra los equipos que no está en torneo y los pueda elegir
                const nombres = data.filter(equipo => equipo.tipoJuego.toString() === id && !equipos.some(e => e === equipo.equipo)).map(equipo => equipo.equipo); 
                setLista(nombres);
            })
            .catch((error) => console.error("Error de agregar equipos:" + error))
    }, [id])
    //iniciar sesión con administrador
    const [formData,setFormData]=useState({
        user:'',
        pwd:'',
        eqElegido:[],
    });
    const handleChange = (e) => {
        //conseguir los elementos de formulario,name se refiere a "administrador","contraseña", value se refiere a los valores que introduce
          const { name, value } = e.target;
          //actualizar los valores de formData
          setFormData({
              ...formData,
              [name]: value,
          });
      };
    //confirmar admin
    const confirmaAdmin = async (e) => {
        e.preventDefault()
         // verificar si rellenar el formulario de admin
        if (!formData.user || !formData.pwd) {
            console.error('Por favor, introduce usuario y contraseña.');
            return;
        }
        //si no introduce los datos o introduce sin válidos, no va a envivar los datos
          
          try {
              //manda nombre y contrase;a de administrador que iniciar sesi'on
              //conecta el servidor virtual que creamos
              const response = await fetch(`http://localhost:3001/admin`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user:formData.user,
                  pwd:formData.pwd,
                }),
  
              });
  
              const result=await response.json()
              //si la verificacion bien, se sale la msg con 'exito, o sea el código response es 200
              if (response.ok) {
                //la verificacion correcta, isAdmin es true 
                setAdmin(true)
            } else {
                setAdmin(false)
                console.error('Error en la verificación', result);
            }
         } catch (error) {
             console.error('Error:', 'Enviar erro '+error);
          }
      };
      //agregar equipos
      //conseguir equipos elegidos
      const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevState => {
            if (checked) {
                return {
                    ...prevState,
                    eqElegido: [...prevState.eqElegido, value]
                };
            } else {
                return {
                    ...prevState,
                    eqElegido: prevState.eqElegido.filter(eq => eq !== value)
                };
            }
        });
    };

      const agregarEq=async(e)=>{

        try {
            const response=await fetch(`http://localhost:3001/agregarEquipos`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    tipoJuego:id,
                    eqElegido: formData.eqElegido,
                }),
            })
            if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
      }
      
    //animaci'on de click la carta de adiministrador
    const [click, setClick]=useState(equipos[0]);
    
    gsap.registerPlugin(ScrollTrigger);
    useEffect(()=>{
        if(equipos.length>0){
            ScrollTrigger.create({
                trigger:".torneos",
                markers:false,
                start:"0 50%",
                end:"20% 50%",
                scrub:4,
                animation:
                gsap.timeline().fromTo(".adimin",{
                    opacity: 0,
                    y:100,//desde abajo hasta arriba
                },
                {
                    opacity: 1,
                    y:0,
                    stagger:0.2,
                })
            })
        }
    },[equipos.length])
    

    return (
        <>
            <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
            <main className="torneos">
                <article>
                    <div>
                        <h3>Equipos</h3>
                    </div>
                    {equipos.map((equipo,index)=>(
                        <motion.div
                        layout
                        key={index}
                        whileHover={{
                            boxShadow: equipo==click? 'inset 10px 0 1px var(--main-color)':'inset 10px 0 1px var(--default-color3)',
                            cursor: 'pointer',
                            color: equipo==click? 'var(--main-color)':'#fff'
                        }}
                        animate={{
                            boxShadow: equipo==click? 'inset 10px 0 1px var(--main-color)':'',
                            color: equipo==click? 'var(--main-color)':'',
                        }}
                        className="equipo"
                        onClick={()=>{setClick(equipo)}}
                    >
                        <img src="" alt="" />
                        <p>{equipo}</p>
                    </motion.div>
                    ))}
                    <motion.div className="equipo"
                     animate={{
                        backgroundColor:  'var(--main-color)',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                    whileHover={{
                        backgroundColor:'var(--main-color2)'
                    }}
                    // agregar los equipos
                    onClick={handleClick}
                    >unirte con tu equipo</motion.div>
                   
                    {isAdd && !isAdmin?
                    <form action="" className="admin" onSubmit={confirmaAdmin}>
                        <i className='bx bx-x-circle' onClick={quitaClick}></i>
                        <h3>Adiministrador</h3>
                        <label>
                            usuario
                            <input type="text" value={formData.user} name="user" onChange={handleChange} placeholder="Introduce su usuario de administrador "/>
                        </label>
                        <label>
                            contraseña
                            <input type="password" value={formData.pwd} name="pwd" onChange={handleChange} placeholder="Introduce su contraseña"/>
                        </label>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    :isAdd && isAdmin?
                    <form action="" className="add-equipo" onSubmit={agregarEq}>
                        <i className='bx bx-x-circle' onClick={quitaClick}></i>
                        <h3>Lista de Equipos</h3>
                        {listaEquipo==null?
                        listaEquipo.map((equipos, index) => (
                            <label htmlFor={`equipo-${index}`} key={index}>
                                <input type="checkbox" id={`equipo-${index}`} name="equipos" value={equipos} onChange={handleCheckboxChange} />
                                {equipos}
                            </label>  
                        )):<h4>Todos los equipos ya elegido</h4>}
                        <button type="submit">agregar equipos</button>
                    </form>
                    :null
                    }
                    
                </article>
                 <aside className="grafico-partido">
                   {/* Cuadros de los partidos */}
                   <motion.div className="cuadro cuadro-cuartos-1" 
                   animate={{
                            boxShadow: equipos[0]==click? 'inset 10px 0 1px var(--main-color)':'',
                            color: equipos[0]==click? 'var(--main-color)':'',
                        }} 
                    style={{left: '15%', top: '5%'}}>{equipos[0]}</motion.div>
                    <motion.div className="cuadro cuadro-cuartos-2"
                    animate={{
                        boxShadow: equipos[1]==click? 'inset 10px 0 1px var(--main-color)':'',
                        color: equipos[1]==click? 'var(--main-color)':'',
                    }}
                     style={{left: '15%', top: '15%'}}>{equipos[1]}</motion.div>
                    <motion.div className="cuadro cuadro-cuartos-4" 
                     animate={{
                        boxShadow: equipos[2]==click? 'inset 10px 0 1px var(--main-color)':'',
                        color: equipos[2]==click? 'var(--main-color)':'',
                    }}
                    style={{left: '15%', top: '50%'}}>{equipos[2]}</motion.div>
                    <motion.div className="cuadro cuadro-cuartos-3" 
                     animate={{
                        boxShadow: equipos[3]==click? 'inset 10px 0 1px var(--main-color)':'',
                        color: equipos[3]==click? 'var(--main-color)':'',
                    }}
                    style={{left: '15%', top: '40%'}}>{equipos[3]}</motion.div>
                    <motion.div className="cuadro cuadro-cuartos-5" 
                     animate={{
                        boxShadow: equipos[4]==click? 'inset 10px 0 1px var(--main-color)':'',
                        color: equipos[4]==click? 'var(--main-color)':'',
                    }}
                    style={{left: '75%', top: '40%'}}>{equipos[4]}</motion.div>
                    <motion.div className="cuadro cuadro-cuartos-6" 
                     animate={{
                        boxShadow: equipos[5]==click? 'inset 10px 0 1px var(--main-color)':'',
                        color: equipos[5]==click? 'var(--main-color)':'',
                    }}
                    style={{left: '75%', top: '50%'}}>{equipos[5]}</motion.div>
                    <motion.div className="cuadro cuadro-cuartos-7" 
                     animate={{
                        boxShadow: equipos[6]==click? 'inset 10px 0 1px var(--main-color)':'',
                        color: equipos[6]==click? 'var(--main-color)':'',
                    }}
                    style={{left: '75%', top: '5%'}}>{equipos[6]}</motion.div>
                    <motion.div className="cuadro cuadro-cuartos-8" 
                     animate={{
                        boxShadow: equipos[7]==click? 'inset 10px 0 1px var(--main-color)':'',
                        color: equipos[7]==click? 'var(--main-color)':'',
                    }}
                    style={{left: '75%', top: '15%'}}>{equipos[7]}</motion.div>
      
                    <div className="cuadro cuadro-semis-1" style={{left: '29%', top: '24%'}}>Ganador 1 </div>
                    <div className="cuadro cuadro-semis-1" style={{left: '29%', top: '32%'}}>Ganador 2</div>
                    <div className="cuadro cuadro-semis-2" style={{left: '60%', top: '24%'}}>Ganador 3 </div>
                    <div className="cuadro cuadro-semis-2" style={{left: '60%', top: '32%'}}>Ganador 4 </div>
                   
                    
                    <div className="cuadro cuadro-final" style={{left: '45%', top: '33%'}}>Final</div>
                    <div className="cuadro cuadro-final" style={{left: '45%', top: '22%'}}>Final</div>
                    
                    {/* Líneas de conexión */}
                   
                    <div className="linea linea-cuartos" style={{left: '25%', top: '13%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-cuartos" style={{left: '35%', top: '13%', width: '1px', height: '10%', transform: 'translateX(-50%)'}}></div>
                    <div className="linea linea-cuartos" style={{left: '63%', top: '13%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-cuartos" style={{left: '63%', top: '13%', width: '1px', height: '10%', transform: 'translateX(-50%)'}}></div>
                    
                    <div className="linea linea-semis" style={{left: '25%', top: '48%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-semis" style={{left: '35%', top: '39%', width: '1px', height: '9%', transform: 'translateX(-50%)'}}></div>
                    <div className="linea linea-semis" style={{left: '63%', top: '48%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-semis" style={{left: '63%', top: '39%', width: '1px', height: '9%', transform: 'translateX(-50%)'}}></div>
                    <div className="linea linea-final" style={{left: '39%', top: '31%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-final" style={{left: '49%', top: '31%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-final" style={{left: '49%', top: '29%', width: '1px', height: '3%', transform: 'translateX(-50%)'}}></div>

                    <div className="linea linea-abajo" style={{left: '0', top: '57.5%', width: '50%', height: '1px', transform: 'translateY(0.4em)'}}></div>
                    <div className="linea linea-abajo" style={{right: '0', top: '57.5%', width: '50%', height: '1px', transform: 'translateY(0.5em) translateY(-50%)'}}></div>
                    </aside>
            </main>
        </>
    )
}

export default Torneos
