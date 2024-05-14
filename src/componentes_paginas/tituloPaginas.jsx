
import "./tituloPaginas.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
function tituloPaginas(props){

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
        ScrollTrigger.create({
            trigger: ".titulo-paginas",
            // markers: true,
            start:"0% 10%",
            end:"30% 10%",
            // scrub: true,
            animation:
            gsap.timeline().fromTo(".bg-props",{
              filter:"grayscale(100%)",
            },{
              filter:"grayscale(0%)",
              boxShadow:"inset 1px 1px 5px #000",
              borderRadius:"30px",
              scale: 0.9,
              duration: 2,
              ease: "expo.inOut"
            }).fromTo(".clip>h1,.clip>p",{
              y:100,
              opacity: 0
            },{
              y:0,
              opacity: 1,
              duration: 2,
              ease: "expo.inOut"
            },"<")
          })
    });
  return (
    <main className="titulo-paginas">
      <div style={{
        backgroundImage:`url(${props.img})`,
      }} className="bg-props">
        <div className="texto-props">
          <div className="clip">
            <h1>{props.titulo}</h1>
            <p>{props.des}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default tituloPaginas;
