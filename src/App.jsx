
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
import Producto from './Producto';
import ContenidoNoticia from './ContenidoNoticia';
import ScrollToTop from './ScrollToTop';
function App() {
  return (
    <>
      <ScrollToTop/>
      {/* cada vez actualizar la página,llagará a cabecera de la página */}
      <Navbar/>
      {/* Solamente actualizar una parte cuando recarga la navegación para mejorar rendimiento */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/Juegos" element={<Juegos/>}/>
        <Route path="/Juegos/:id" element={<Torneos/>}/>
        <Route path="/Tienda" element={<Tienda/>}/>
        <Route path="/Noticias" element={<Noticias/>}/>
        <Route path="/Registro" element={<Registro/>}/>  
        <Route path="/Tienda/:id" element={<Producto/>}/>       
        <Route path="/Noticias/:id" element={<ContenidoNoticia/>}/>            
      </Routes>
      <Footer/>
    </>
  )
}

export default App
