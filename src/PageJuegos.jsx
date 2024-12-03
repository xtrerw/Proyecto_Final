import { useEffect, useState } from "react";
import "./componentes_index/gameCard.css";
import TituloPaginas from "./componentes_paginas/tituloPaginas";
import CardSearch from "./componentes_index/cardSearch";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

const Juegos = () => {
  const state = {
    img: "src/img/bg1.png",
    title: "Our Games",
    description: "Descubre tu potencial en los juegos",
  };
  const [juegos, setJuegos] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/juegos")
      .then((response) => response.json())
      .then((juegos) => {
        setJuegos(juegos);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  const searchGame = (e) => {
    const newJuegos = juegos.filter((juego) => {
      return juego.nombre.toLowerCase().includes(e.toLowerCase());
    });

    setJuegosFiltrados(newJuegos);
  };

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".page-juegos",
      start: "0 80%",
      end: "0 80%",
      toggleActions: "restart none reverse",
      animation: gsap.timeline().fromTo(
        ".card-container",
        {
          y: 100,
        },
        {
          y: 0,
          duration: 2,
          ease: "expo.inOut",
        }
      ),
    });
  });

  const listToShow = () => {
    if (juegosFiltrados.length > 0) {
      return juegosFiltrados.map((juego, index) => (
        <Link to={`/torneos/${juego._id}`} key={index} className="card">
         <img src={`../${juego.imagen}`} alt="Card" />
        </Link>
      ));
    } else {
      return juegos.map((juego, index) => (
        <Link to={`/torneos/${juego._id}`} key={index} className="card">
          <img src={`../${juego.imagen}`} alt="Card" />
        </Link>
      ));
    }
  };

  return (
    <>
      <TituloPaginas
        img={state.img}
        titulo={state.title}
        des={state.description}
      />
      <CardSearch searchGame={searchGame} />
      <main className="page-juegos">
        <div className="card-container">{listToShow()}</div>
      </main>
    </>
  );
};

export default Juegos;
