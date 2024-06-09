import "./howToPlay.css";
import { motion } from "framer-motion";
import img1 from "../img/teamUp.png";
import img2 from "../img/join.png";
import img3 from "../img/rewards.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";
function How() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".how",
      markers: false,
      start: "40% 70%",
      end: "40% 70%",
      toggleActions: "restart none reverse",
      animation: gsap
        .timeline()
        .fromTo(
          ".p0",
          {
            y: 50,
            opacity: 0,
          },
          { y: 0, opacity: 1 }
        )
        .fromTo(
          ".p1",
          {
            y: 50,
            opacity: 0,
          },
          { y: 0, opacity: 1 }
        )
        .fromTo(
          ".p2",
          {
            y: 50,
            opacity: 0,
          },
          { y: 0, opacity: 1 }
        ),
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  const imgs = [img1, img2, img3];
  const titulo = ["1. Team Up", "2. Team Down", "3. Rewards"];
  const p = [
    "Reune a tus amigos y crea un equipo",
    "Unete a un torneo y lucha por la victoria",
    "Canjea premios con los puntos que ganes en los torneos",
  ];
  return (
    <main className="how">
      <h1>How To Play</h1>
      <div className="procesos">
        {imgs.map((img, index) => (
          <motion.div key={index} className={`proceso p${index}`}>
            <img src={img} alt="" />
            <h3>{titulo[index]}</h3>
            <p>{p[index]}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
export default How;
