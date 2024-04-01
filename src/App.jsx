import { useState } from 'react'
import './App.css'
import { AnimatePresence, motion} from "framer-motion"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import player1 from '../src/img/player1.png';
import player2 from '../src/img/player2.png';
import player3 from '../src/img/player3.png';
import player4 from '../src/img/player4.png';
import player5 from '../src/img/player5.png';

function App() {
  gsap.registerPlugin(ScrollTrigger);
  
  useGSAP(() => {
    //top jugadores
    //animacion de carta
    ScrollTrigger.create({
        trigger:".topJugador",
        start:"0% 50%",
        end:"0% 50%",
        toggleActions:"play none reverse none",
        animation:
        gsap.timeline().fromTo(".jugadores",{opacity:0,scale:0.5},{
          scale:0.7,
          opacity:1,
          borderRadius:20,
        })
        .fromTo(".tituloJugador",{opacity:0,x:-100},{opacity:1,x:0})//titulo jugadores
        .to(".jugador0",{borderRadius:20},"")//top jugador1
        .fromTo(".jugador1",{x:0},{x:-200,borderRadius:20},"")//top jugador2
        .fromTo(".jugador2",{x:0},{x:200,borderRadius:20},"")//top jugadore3
        .fromTo(".jugador3",{x:0},{x:-340,borderRadius:20},"")//top jugador4
        .fromTo(".jugador4",{x:0},{x:340,borderRadius:20},"")//top jugador5
    })
    //animación de introducción
    ScrollTrigger.create({
        trigger:".topJugador",
        start:"30% 50%",
        end:"30% 50%",
        toggleActions:"play none reverse none",
        animation:
        gsap.timeline()
        .fromTo(".introJugador",{opacity:0,x:100},{opacity:1,x:0,borderRadius:20})
    });
    //animación de notícia
    ScrollTrigger.create({
        markers:true,
        trigger:".noticiaJugador",
        start:"-10% 50%",
        end:"25% 50%",
        toggleActions:"play none reverse none",
        scrub:true,
        animation:
        gsap.timeline()
        .fromTo(".noticias",{scale:1},{scale:0.8,width:"100vw"},"")
        .fromTo(".noticia",{},{
          borderRadius:20,
        },"")
        .fromTo(".noticia0",{},{
          width:"0",
        },"")
        .fromTo(".noticia4",{},{
          width:"0",
        },"")
    });
    //animaci'on de t'itulo
    ScrollTrigger.create({
      markers:true,
      trigger:".noticiaJugador",
      start:"25% 50%",
      end:"25% 50%",
      toggleActions:"play none reverse none",
      animation:
      gsap.timeline()
      .fromTo(".noticiaJugador>h1",{x:-100,opacity:0},{x:0,opacity:1})
  });
  });
  
  const titulo="Champions eLeague";
  const span=titulo.split("");

  const tituloMotion={
    hidden: { opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      }
  }
  }

  const letra = {
    hidden: { opacity: 1,filter:"drop-shadow(0px 0px 0px red)"},
    visible: {
      opacity: 1,
      color:"orangered",
      filter: "drop-shadow(10px 10px 1px orange)",
    }
  };
  //array de imagenes
  const imgs=[player1,player2,player3,player4,player5]
  //array de noticias
  const noticias1=[player1,player2,player3,player4,player5];
  const [idNoticia,setNoticia]= useState(null);
  return (
    <>
      <header></header>
      <section>
        <motion.h1  variants={tituloMotion} initial="hidden" animate="visible" >
            {span.map((span,index)=>(<motion.span key={index} className='letra' variants={letra} >{span}</motion.span>))}
        </motion.h1>
      </section>
      <main className='topJugador'>
        <h2 className='tituloJugador'>Top <br/> Jugadores</h2>
        <div className='jugadores'>
          {imgs.map((img,index)=>(
          <motion.div 
          key={index}
          className={`jugador${index}`} 
          style={{backgroundImage: `url(${img})`}}>
          </motion.div>
          ))}
          <div className='introJugador'>
            <h1>Top Jugadores</h1>
            <p>En el vertiginoso mundo de los esports, la competencia es feroz y los talentos brillan con intensidad. Entre los numerosos jugadores destacados, hay cinco nombres que resuenan con fuerza en la escena competitiva. Acompáñanos mientras exploramos la trayectoria de estos cinco titanes que han dejado una marca indeleble en los esports.</p>
            <h3>ver jugadores</h3>
          </div>
        </div>
      </main>
      <main className='noticiaJugador'>
        <h1>Noticias</h1>
        <div className='noticias'>
          {/* inserta cada imagen de noticia a las divisiones */}
          {noticias1.map((noticia,index)=>(
            <motion.div
            layoutId={index} 
            onClick={()=>setNoticia(index)}
            className={`noticia noticia${index}`}
            style={{backgroundImage: `url(${noticia})`}}
            whileHover={{scale:0.98,filter:"none"}}>
              <motion.h1>
                wtf
              </motion.h1>
              <motion.h2>
                holy shot
              </motion.h2>
            </motion.div>
          ))}
        </div>
        {/* animación ampliada en caso de seleccionar las noticias a trav'es de AnimatePresencee */}
        <AnimatePresence>
            {/* confirma si ya configura id */}
            {idNoticia && (
              <motion.div layoutId={idNoticia} className='clicNoticia'>
                <motion.img src={`${noticias1[idNoticia]}`}/>
                <motion.button onClick={() => setNoticia(null)}>
                  <i class='bx bxs-x-circle'></i>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <div>
              
          </div>
      </main>
    </>
  )
}

export default App
