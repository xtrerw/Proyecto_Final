
import { useEffect, useState } from "react";
import "./PageTorneos.css"
import TituloPaginas from './componentes_paginas/tituloPaginas';
import { color, motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const Torneos = () => {
    const state={img:'../src/img/bg3.png',title:"Torneos",description:"Alcanza la victoria"};
    const adimins=["a","b","c","d","e"];
    //animaci'on de click la carta de adiministrador
    const [click, setClick]=useState(adimins[0]);
    const [click2,setClick2]=useState("P");//P es playoff
    console.log(click);
    gsap.registerPlugin(ScrollTrigger);
    useEffect(()=>{
        if(adimins.length>0){
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
    },[])
    

    return (
        <>
            <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
            <main className="torneos">
                <article>
                    <div>
                        <h3>Adiministradores y Eventos</h3>
                    </div>
                    {adimins.map((adimin,index)=>(
                        <motion.div
                        layout
                        key={index}
                        whileHover={{
                            boxShadow: adimin==click? 'inset 10px 0 1px var(--main-color)':'inset 10px 0 1px var(--default-color3)',
                            cursor: 'pointer',
                            color: adimin==click? 'var(--main-color)':'#fff'
                        }}
                        animate={{
                            boxShadow: adimin==click? 'inset 10px 0 1px var(--main-color)':'',
                            color: adimin==click? 'var(--main-color)':'',
                        }}
                        className="adimin"
                        onClick={()=>{setClick(adimin)}}
                    >
                        <img src="" alt="" />
                        <p>adimin{adimin}</p>
                    </motion.div>
                    ))}
                </article>
                 <aside className="grafico-partido">
                   {/* Cuadros de los partidos */}
                   <div className="cuadro cuadro-cuartos-1" style={{left: '15%', top: '5%'}}>Equipo 1</div>
                    <div className="cuadro cuadro-cuartos-2" style={{left: '15%', top: '15%'}}>Equipo 2</div>
                    <div className="cuadro cuadro-cuartos-3" style={{left: '15%', top: '50%'}}>Equipo 3</div>
                    <div className="cuadro cuadro-cuartos-4" style={{left: '15%', top: '40%'}}>Equipo 4</div>

                    <div className="cuadro cuadro-semis-1" style={{left: '29%', top: '24%'}}>Ganador 1 </div>
                    <div className="cuadro cuadro-semis-2" style={{left: '29%', top: '32%'}}>Ganador 2</div>
                    
                    <div className="cuadro cuadro-final" style={{left: '45%', top: '20%'}}>Final</div>
                    
                    {/* Líneas de conexión */}
                   
                    <div className="linea linea-cuartos" style={{left: '25%', top: '13%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-cuartos" style={{left: '35%', top: '13%', width: '1px', height: '10%', transform: 'translateX(-50%)'}}></div>
                    
                    <div className="linea linea-semis" style={{left: '25%', top: '48%', width: '10%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-semis" style={{left: '35%', top: '39%', width: '1px', height: '9%', transform: 'translateX(-50%)'}}></div>
                    <div className="linea linea-final" style={{left: '0', top: '57.5%', width: '50%', height: '1px', transform: 'translateY(-50%)'}}></div>
                    <div className="linea linea-final" style={{right: '0', top: '57.5%', width: '50%', height: '1px', transform: 'translateY(0.5em) translateY(-50%)'}}></div>
                    </aside>
            </main>
        </>
    )
}

export default Torneos
