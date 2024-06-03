
import './App.css'
import Footer from "../src/componentes/footer";
import Navbar from './componentes/Navbar';
import { Route, Routes } from 'react-router-dom';
import Admin from './PageAdmin'
import Juegos from './PageJuegos';
import Home from './PageHome';
import Torneos from './PageTorneos';
import Tienda from './PageTienda';
import Noticias from './PageNoticias';
import Registro from './PageRegistro';
import Usuario from './PageUsuario';
import Producto from './Producto';
import ContenidoNoticia from './ContenidoNoticia';
import ScrollToTop from './ScrollToTop';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
//hook de redux
import { useSelector } from "react-redux";
function App() {
  //conseguir id de usuario desde la pagina registro 
  //session
  const user=useLocation().state?.userEquipo.user
  const [perfil,setPerfil]=useState({})
  useEffect(()=>{
    if (user) {
      setPerfil(user)
    }
  },[user])
  //encuentra los equipos que los usuarios tienen
  const equipos=useLocation().state?.userEquipo.equipo
  const [equiposTienen,setEquipos]=useState({})
  useEffect(()=>{
    if (equipos) {
      setEquipos(equipos)
    }
  },[equipos])
  console.log(equiposTienen);
   //utilizando redux, conseguir ptos de usuarios actualizado
   const resultaPtos=useSelector((state)=>state)
  //si resultaPtos se establece,perfil.ptos será igaul q ellos. si no, perfil no se va cambiar
  useEffect(() => {
    if (resultaPtos && perfil.ptos !== resultaPtos) {
      setPerfil((prevPerfil) => ({
        ...prevPerfil,
        ptos: resultaPtos
      }));
    }
  }, [perfil.ptos, resultaPtos]);

  return (
    <>
      <ScrollToTop/>
      {/* cada vez actualizar la página,llagará a cabecera de la página */}
      <Navbar img={perfil.img} ptos={perfil.ptos} nombre={perfil.nombre}/>
      {/* Solamente actualizar una parte cuando recarga la navegación para mejorar rendimiento */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Administrador' element={<Admin/>}/>
        <Route path="/Juegos" element={<Juegos/>}/>
        <Route path="/Juegos/:id" element={<Torneos/>}/>
        <Route path="/Tienda" element={<Tienda/>}/>
        <Route path="/Noticias" element={<Noticias/>}/>
        <Route path="/Registro" element={<Registro/>}/> 
        <Route path="/modifica" element={<Usuario nombre={perfil.nombre} apellidos={perfil.apellidos} img={perfil.img} email={perfil.correo} user={perfil.nombreUsuario} pwd={perfil.contraseña} ptos={perfil.ptos} equipos={equiposTienen}/>}/>  
        <Route path="/Tienda/:id" element={<Producto ptos={perfil.ptos} id={perfil._id} nombre={perfil.nombre} />}/>       
        <Route path="/Noticias/:id" element={<ContenidoNoticia/>}/>            
      </Routes>
      <Footer/>
    </>
  )
}

export default App
