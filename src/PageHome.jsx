import React from 'react'
import Titulo from "./componentes_index/titulo";
import How from './componentes_index/howToPlay';
import Noticias from './componentes_index/noticias';
import OurGames from './componentes_index/game';
import Tienda from './componentes_index/tienda';
const Home = () => {
  return (
    <>
        <Titulo/>
        <How/>
        <OurGames/>
        <Tienda/>
        <Noticias/>
    </>
  )
}

export default Home
