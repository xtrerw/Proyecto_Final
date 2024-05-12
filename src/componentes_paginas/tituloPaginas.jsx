
import "./tituloPaginas.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
function tituloPaginas(props){

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
        ScrollTrigger.create({
            trigger: ".titulo-paginas",
            markers: true,
            start:"0% 10%",
            end:"30% 10%",
            // scrub: true,
            animation:
            gsap.timeline().to(".bg-titulo",{
              borderRadius:"30px",
              scale: 0.9,
              duration: 2,
              ease: "expo.inOut"
            },"<")
          })
    });
  return (
    <main className="titulo-paginas">
      {/* <img src={props.img} alt="" /> */}
      <div style={{
        backgroundImage:`url(${props.img})`,
      }} className="bg-titulo">
        <h1>{props.titulo}</h1>
        <p>{props.des}</p>
      </div>
    </main>
  )
}

export default tituloPaginas;
