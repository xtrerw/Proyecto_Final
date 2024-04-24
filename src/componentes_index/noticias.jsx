import "./noticias.css"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { useState} from "react";
function Noticias() {
  gsap.registerPlugin(ScrollTrigger);

  const spans = useState(Array(6).fill("Notícia"));
  // const spanRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (spanRef.current) { // 确保 spanRef.current 不为空
  //       const rect = spanRef.current.getBoundingClientRect();
  //       if (rect.right <= 0) {
  //         console.log(1);
  //         setSpans(prevSpans => prevSpans.filter(span =>
  //           {
  //             if (span != spanRef.current) {
                
  //               return console.log(1); // 保留当前元素
  //             } else {
  //               console.log(0); // 输出信息
  //               return false; // 过滤掉当前元素
  //             }
  //           }));
  //       }
  //     }
  //   };
  
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  


    useGSAP(()=>{
        ScrollTrigger.create({
            trigger: ".noticias",
            markers: true,
            start: "0% 100%",
            end: "100% 100%",
            scrub:true,
            // toggleActions: "play none none",
            animation: 
            gsap.timeline().fromTo(".noticias>h1",{
                x: "0%",
            },{x:"-100%",
              duration:5,
              // repeat: -1,
              ease: "linear",
          }),
        })
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    });
    return (
      <main className="noticias">
        <h1>
          {spans.map((text, index) => (<span key={index}>{text}</span>))}
        </h1>
      </main>
    )
  }
  
  export default Noticias