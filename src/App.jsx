
import './App.css'
import Footer from "../src/componentes/footer";
import Navbar from './componentes/Navbar';
import { Route, Routes } from 'react-router-dom';
import Juegos from './PageJuegos';
import Home from './PageHome';
import Torneos from './PageTorneos';
import Tienda from './PageTienda';
import Noticias from './PageNoticias';
import Registro from './PageRegistro';
function App() {
  return (
    <>
      <Navbar/>
      {/* Solamente actualizar una parte cuando recarga la navegación para mejorar rendimiento */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/Juegos" element={<Juegos/>}/>
        <Route path="/Torneos" element={<Torneos/>}/>
        <Route path="/Tienda" element={<Tienda/>}/>
        <Route path="/Noticias" element={<Noticias/>}/>
        <Route path="/Registro" element={<Registro/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
