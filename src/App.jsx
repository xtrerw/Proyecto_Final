
import './App.css'
import Footer from "../src/componentes/footer";
import Titulo from "./componentes_index/titulo";
import How from './componentes_index/howToPlay';
import Noticias from './componentes_index/noticias';
import OurGames from './componentes_index/game';
import Tienda from './componentes_index/tienda';
import Navbar from './componentes/Navbar';
// import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Navbar/>
      <Titulo/>
      <How/>
      <OurGames/>
      <Tienda/>
      <Noticias/>
      <Footer/>
      {/* <Routes>
        <Route path='/header' element={<Header/>}/>
      </Routes> */}
    </>
  )
}

export default App
