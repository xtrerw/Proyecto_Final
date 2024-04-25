import "./noticias.css"
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
function Noticias() {
  gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
        ScrollTrigger.create({
            trigger: ".noticias",
            markers: true,
            start: "0% 100%",
            end: "0% 100%",
            // scrub:true,
            toggleActions: "restart none none",
            animation: 
            gsap.timeline().fromTo(".scroll-titulo",{
                x: "0%",
            },{x:"-1%",
              duration:10,
              repeat: -1,
              ease: "linear",
          })
        })
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    });
    const spans = Array(100).fill("Noticias 뉴스 News ニュース Notizie 新聞 Новини");
    const divs=Array(4).fill(0);
    return (
      <main className="noticias">
        <h1 className="scroll-titulo">
          {spans.map((text, index) => (<span key={index}>{text}</span>))}
        </h1>
        <section className="noticias-parte">
          <h1 className="noticias-titulo">Últimas Noticias</h1>
          <div className="noticia">
            {divs.map((index)=>(
            <motion.div key={index} className="noticia-contenido">
              <img src="" alt="" />
              <p>artículo</p>
              <h3>Estado del juego: esports de LoL en 2024</h3>
            </motion.div>))}
          </div>
        </section>
      </main>
    )
  }
  export default Noticias