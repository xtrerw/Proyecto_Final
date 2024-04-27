import "./noticias.css"
import { motion } from "framer-motion";
import ScrollProps from "./scrolltext";
function Noticias() {
    const divs=Array(4).fill(0);
    return (
      <main className="noticias">
        <ScrollProps v={-1} titulo={'Noticias 뉴스 News ニュース Notizie 新聞 Новини'}/>
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
          <ScrollProps v={1} titulo={'Noticias 뉴스 News ニュース Notizie 新聞 Новини'}/>
        </section>
      </main>
    )
  }
  export default Noticias