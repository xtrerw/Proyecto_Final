
import { motion } from 'framer-motion';
import "./titulo.css";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
function Titulo() {
  gsap.registerPlugin(ScrollTrigger);
  
  useGSAP(()=>{
    ScrollTrigger.create({
      trigger: ".parte-titulo",
      // markers: true,
      start:"100% 100%",
      end:"150% 100%",
      scrub: true,
      animation:
      gsap.timeline().to(".parte-titulo",{
        borderRadius:"40px",
        scale: 0.85
      },"<").to(".parte-titulo>img",{
        borderBottomRightRadius:"40px",
      },"<")
    })
  });
  //configura estado inicial del titulo
  const titulo = "OnlyGG Esport";
  const splite = titulo.split("");
  //párrafo de la parte título
  const p1=["Plataforma líder en esports.","Espacio exclusivo para jugadores altamente habilidosos.","Combina tecnología avanzada con un enfoque comunitario."];
    return(
        <section className='parte-titulo'>
        <div className='titulo'>
            <h1>
              {splite.map((span,index)=>(<motion.span key={index}
              animate={{  
                opacity: [0,1],
                color: [ "#1996f7", "#fff"]
              }}
              transition={{
                delay: index/10,
                duration: 0.5,
                ease: 'anticipate',
              }}
              >{span}</motion.span>))}
            </h1>
            {p1.map((texto,index)=>(<motion.p key={index}
              initial={{y:-50,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{
                duration:0.5,
                delay: 2+index/2,
                ease:"easeInOut"
              }}
            >{texto}</motion.p>))}
        </div>
        <motion.img 
        src="src\img\imgTitulo.png" alt="" />
      </section>
    )
}
export default Titulo;