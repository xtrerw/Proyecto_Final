
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
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
function App() {
  //conseguir id de usuario desde la pagina registro
  //session
  const userID=useLocation().state?.userID
  //pedir la img o nombre de usuario
  const [perfil,setPerfil]=useState({});
  useEffect(()=>{
    if (userID) {
      //para enviar id a node js
      fetch(`http://localhost:3001/perfil?id=${userID}`)
      .then(response => response.json())
      .then((dato)=>{
        setPerfil(dato);
      }
    )
      .catch((error) => console.error(error))
    }
  },[userID])
  console.log(userID);
  return (
    <>
      <ScrollToTop/>
      {/* cada vez actualizar la página,llagará a cabecera de la página */}
      <Navbar img={perfil.img} ptos={perfil.ptos} nombre={perfil.nombre}/>
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
