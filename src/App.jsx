import './App.css';
import Footer from "../src/componentes/footer";
import Navbar from './componentes/Navbar';
import { Route, Routes } from 'react-router-dom';
import Juegos from './PageJuegos';
import Home from './PageHome';
import Torneos from './PageTorneosJuego';
import PageTorneosJuego from './PageTorneosJuego';
import PageDetallesTorneo from './pageDetallesTorneo';
import Tienda from './PageTienda';
import Noticias from './PageNoticias';
import Registro from './PageRegistro';
import Admin from './PageAdmin';
import Dashboard from './pageDashboard';
import Usuario from './PageUsuario';
import Producto from './Producto';
import ContenidoNoticia from './ContenidoNoticia';
import ScrollToTop from './ScrollToTop';
import { useLocation } from 'react-router-dom';
import TorneoDetalles from "./TorneoDetalles"; // Página para los detalles de torneos
import { useEffect, useState } from 'react';
// Importar AuthContext y ProtectedRoute
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
// Hook de Redux
import { useSelector } from "react-redux";

function App() {
  // Conseguir id de usuario desde la página registro
  const user = useLocation().state?.userEquipo.user;
  const [perfil, setPerfil] = useState({});
  
  useEffect(() => {
    if (user) {
      setPerfil(user);
    }
  }, [user]);

  console.log(perfil);

  // Encuentra los equipos que los usuarios tienen
  const equipos = useLocation().state?.userEquipo.equipo;
  const [equiposTienen, setEquipos] = useState({});

  useEffect(() => {
    if (equipos) {
      setEquipos(equipos);
    }
  }, [equipos]);

  // Utilizando redux, conseguir puntos de usuarios actualizados
  const resultaPtos = useSelector((state) => state);
  useEffect(() => {
    if (resultaPtos && perfil.ptos !== resultaPtos) {
      setPerfil((prevPerfil) => ({ ...prevPerfil, ptos: resultaPtos }));
    }
  }, [perfil.ptos, resultaPtos]);

  // Los datos de carrito
  const [cartItems, setCartItems] = useState([]);
  const handleAddToCart = (item) => {
    setCartItems((prevCart) => {
      // Si existe producto en el carrito
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        // Actualizar la cantidad del producto
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, cantidad: cartItem.cantidad + item.cantidad }
            : cartItem
        );
      }
      // Agregar nuevo producto al carrito
      return [...prevCart, item];
    });
  };

  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar img={perfil.img} ptos={perfil.ptos} nombre={perfil.nombreUsuario} />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/Juegos" element={<Juegos />} />
        <Route path="/Juegos/:id" element={<Torneos />} />
        <Route path="/torneos/:juegoId" element={<PageTorneosJuego perfil={perfil} />} />
        <Route path="/torneos/:torneoId" element={<PageDetallesTorneo />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Administrador" element={<Admin />} />

        {/* Ruta protegida */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Otras rutas */}
        <Route
          path="/modifica"
          element={
            <Usuario
              id={perfil._id}
              img={perfil.img}
              email={perfil.correo}
              user={perfil.nombreUsuario}
              pwd={perfil.contraseña}
              ptos={perfil.ptos}
              direccion={perfil.dir}
            />
          }
        />
        <Route
          path="/Tienda"
          element={<Tienda cartItems={cartItems} propsPerfil={perfil} setCartItems={setCartItems} />}
        />
        <Route
          path="/Tienda/:id"
          element={<Producto addToCart={handleAddToCart} />}
        />
        <Route path="/torneo/:id" element={<TorneoDetalles />} />
        <Route path="/Noticias/:id" element={<ContenidoNoticia />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
