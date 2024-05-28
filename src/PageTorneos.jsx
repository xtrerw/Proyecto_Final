
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
                <aside>
                    <div>
                        <h3>Fase:</h3>
                        <motion.h3 
                        layout
                        whileHover={{
                            color:click2=='P'? 'var(--main-color)':'#fff',//si est'a pulsado, mantenga el color rojo
                            cursor:'pointer'
                        }}
                        animate={{
                            color:click2=='P'? 'var(--main-color)':''//el color será rojo en caso de seleccionado
                        }}
                        onClick={()=>{setClick2("P")}}
                        >PLAYOFF</motion.h3>
                        <motion.h3 
                        layout
                        whileHover={{
                            color:click2=='T'? 'var(--main-color)': '#fff',
                            cursor:'pointer'
                        }} 
                        animate={{
                            color:click2=='T'? 'var(--main-color)': ''
                        }}
                        onClick={()=>{setClick2("T")}}
                        >TEMPORADA REGULAR</motion.h3>
                    </div>
                    <div className="grafico-partido">
                        
                    </div>
                </aside>
            </main>
        </>
    )
}

export default Torneos
