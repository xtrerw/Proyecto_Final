import React from "react";
import './componentes_index/gameCard.css';
import TituloPaginas from './componentes_paginas/tituloPaginas';
import CardSearch from "./componentes_index/cardSearch";
import Card from './componentes_index/gameCard'; // Importa el componente de Card

export default function Games(){
<<<<<<< HEAD
  const state={img:'src/img/bg3.png',title:"Our Games",description:"Descubre tu potencial en los juegos"};

  // Aquí puedes definir las URLs de tus imágenes para las cartas
  const cards = [
    { id: 1, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 2, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 3, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 4, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 2, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 1, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 2, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 3, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 4, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 2, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 4, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
    { id: 4, imageUrl: 'src/img/lol.png', to: '/pagina-de-destino-1' },
  ];

=======
  const state={img:'src/img/bg1.png',title:"Our Games",description:"Descubre tu potencial en los juegos"};
>>>>>>> 057784d50399164fb90264080a44df94bffc2b0e
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