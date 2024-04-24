import "./noticias.css"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
function Noticias() {
  gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
        ScrollTrigger.create({
            trigger: ".noticias",
            // markers: true,
            start: "0% 70%",
            end: "50% 70%",
            scrub:true,
            toggleActions: "restart none reverse",
            animation: 
            gsap.timeline().fromTo(".noticias",{
                yPercent:0
            },{yPercent:0})
        })
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    });
    return (
      <main className="noticias">
        
      </main>
    )
  }
  
  export default Noticias