import { motion } from 'framer-motion';
import "./titulo.css"
function Titulo() {
  //párrafo de la parte título
  const p1=["Plataforma líder en esports.","Espacio exclusivo para jugadores altamente habilidosos.","Combina tecnología avanzada con un enfoque comunitario."];
    return(
        <section className='parte-titulo'>
        <div className='titulo'>
            <h1>OnlyGG Esport</h1>
            {p1.map((texto,index)=>(<motion.p key={index}
              initial={{y:30,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{
                duration:0.5,
                delay: index/2,
                ease:[0,0.3, 0.7, 2]
              }}
            >{texto}</motion.p>))}
        </div>
        <img src="src\img\imgTitulo.png" alt="" />
      </section>
    )
}
export default Titulo;