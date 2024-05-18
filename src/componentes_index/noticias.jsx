import "./noticias.css"
import { useState,useEffect } from "react";
import ScrollProps from "./scrolltext";
import { Link } from "react-router-dom";
function Noticias() {
  //sacar las noticias desde servidor node.
  const [news, setNews] = useState([]);// configurar array principal de noticias.
  //cambiar los datos de noticias dinamicamente
    useEffect(() => {
        //crear un petición API que indica al servidor de node que creamos en api.js 
        fetch('http://localhost:3001/noticias')
            .then(response => response.json())
            .then(noticias => {
                setNews(noticias.slice(0,4));//conseguir los 4 primeros noticias
            })
            .catch(error => {
                console.error('error:', error);
            });
    }, []);
    return (
      <main className="noticias">
        <ScrollProps v={-1} titulo={'Noticias 뉴스 News ニュース Notizie 新聞 Новини'}/>
        <section className="noticias-parte">
          <h1 className="noticias-titulo">Últimas Noticias</h1>
          <div className="noticia">
          {/* muestra las noticias */}
          {news.map(item => (
                    <div key={item._id} className="noticia-contenido">
                        <img src={`../${item.img}`} alt={item.titulo} />
                        <p>{item.tipoJuego}</p>
                        <Link to={`/Noticias/${item._id}`}>
                          <h3>{item.titulo}</h3>
                        </Link>
                    </div>
                ))}
          </div>
          <ScrollProps v={1} titulo={'Noticias 뉴스 News ニュース Notizie 新聞 Новини'}/>
        </section>
      </main>
    )
  }
  export default Noticias