import React, { useEffect, useState } from 'react';
import "./componentes_index/gameCard.css";
import TituloPaginas from './componentes_paginas/tituloPaginas';
import CardSearch from "./componentes_index/cardSearch";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Juegos = () => {
    const state = { img: 'src/img/bg1.png', title: "Our Games", description: "Descubre tu potencial en los juegos" };
    const [juegos, setJuegos] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3001/juegos')
        .then(response => response.json())
        .then(juegos =>{setJuegos(juegos)})
        .catch(error => {
            console.error('error:', error);
        });
    },[]);
    

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: ".page-juegos",
            start: "0 80%",
            end: "0 80%",
            toggleActions: "restart none reverse",
            animation: gsap.timeline().fromTo(".card-container", {
                y: 100,
            }, {
                y: 0,
                duration: 2,
                ease: "expo.inOut",
            }),
        });
    });

    return (
        <>
            <TituloPaginas img={state.img} titulo={state.title} des={state.description} />
            <CardSearch />
            <main className='page-juegos'>
                <div className="card-container">
                    {juegos.map(juego => (
                        // <Card key={juego._id} imageUrl={juego.imageUrl} />
                        <div className="card">
                          <img key={juego._id} src={`${juego.imagen}`} alt="Card" />
                        </div>
                    ))} 
                </div>
            </main>
        </>
    );
}

export default Juegos;
