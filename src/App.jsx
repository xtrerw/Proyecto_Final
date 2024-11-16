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
import Admin from './PageAdmin'
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
  const [perfil,setPerfil]=useState({});
  useEffect(()=>{
    if (user) {
      //llama a función para guardar usuario
      setPerfil(user)
    }
  },[user])
  console.log(perfil);
  //encuentra los equipos que los usuarios tienen
  const equipos=useLocation().state?.userEquipo.equipo
  const [equiposTienen,setEquipos]=useState({});
  useEffect(()=>{
    if (equipos) {
      setEquipos(equipos)
    }
  },[equipos])
   //utilizando redux, conseguir ptos de usuarios actualizado
   const resultaPtos=useSelector((state)=>state)
  //si resultaPtos se establece,perfil.ptos será igaul q ellos. si no, perfil no se va cambiar
  useEffect(() => {
    if (resultaPtos && perfil.ptos !== resultaPtos) {
      setPerfil((prevPerfil) => (
       { ...prevPerfil,ptos: resultaPtos,}
    ))}
  }, [ perfil.ptos,resultaPtos]);
  //REDUX para actualizar los datos de perfil
  // //recibir perfil modificado
  // const resultaActualizaDatos=useSelector((state)=>state)
  // useEffect(() => {
  //   if (resultaActualizaDatos) {
  //     setPerfil(resultaActualizaDatos)
  //   }
  // }, [resultaActualizaDatos]);
  return (
    <>
      <ScrollToTop/>
      {/* cada vez actualizar la página,llagará a cabecera de la página */}
      <Navbar img={perfil.img} ptos={perfil.ptos} nombre={perfil.nombreUsuario}/>
      {/* Solamente actualizar una parte cuando recarga la navegación para mejorar rendimiento */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/Juegos" element={<Juegos/>}/>
        <Route path="/Juegos/:id" element={<Torneos/>}/>
        <Route path="/Tienda" element={<Tienda/>}/>
        <Route path="/Noticias" element={<Noticias/>}/>
        <Route path="/Registro" element={<Registro/>}/>
        <Route path='/Administrador' element={<Admin/>}/>
        <Route path="/modifica" element={<Usuario id={perfil._id} img={perfil.img} email={perfil.correo} user={perfil.nombreUsuario} pwd={perfil.contraseña} ptos={perfil.ptos} direccion={perfil.dir}/>}/>  
        <Route path="/Tienda/:id" element={<Producto ptos={perfil.ptos} id={perfil._id} nombre={perfil.nombreUsuario} />}/>       
        <Route path="/Noticias/:id" element={<ContenidoNoticia/>}/>            
      </Routes>
      <Footer/>
    </>
  )
}

export default App
