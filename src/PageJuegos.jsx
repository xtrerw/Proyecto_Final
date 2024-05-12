import React from "react";
import './componentes_index/gameCard.css';
import TituloPaginas from './componentes_paginas/tituloPaginas';
import CardSearch from "./componentes_index/cardSearch";
import Card from './componentes_index/gameCard'; // Importa el componente de Card

export default function Games(){
  const state={img:'src/img/bg3.png',title:"Our Games",description:"Descubre tu potencial en los juegos"};
  return (
    <div>
      <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
      <CardSearch /> {/* Aquí se incorpora el componente de búsqueda */}
      <div className="card-container">
        {cards.map(card => (
          <Card key={card.id} imageUrl={card.imageUrl} />
        ))}
      </div>
    </div>
  );
}