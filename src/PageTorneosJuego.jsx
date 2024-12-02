import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // No necesitamos el navigate si todo es popup
import "./PageTorneosJuego.css";

const PageTorneosJuego = () => {
  const { juegoId } = useParams();  // Obtener el juegoId de los parámetros de la URL

  const [torneos, setTorneos] = useState([]);  // Estado para los torneos
  const [juego, setJuego] = useState(null);    // Estado para el juego
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null);    // Estado para manejar errores
  const [equipos, setEquipos] = useState({});  // Estado para almacenar los equipos
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup
  const [selectedTorneo, setSelectedTorneo] = useState(null); // Estado para el torneo seleccionado para el popup

  // Supongo que tienes el perfil del usuario con el equipo logueado
  const perfil = JSON.parse(localStorage.getItem('user')) || {}; // O cualquier otro mecanismo que uses para el perfil del usuario

  useEffect(() => {
    const fetchData = async () => {
      if (!juegoId) {
        setError("El ID del juego no es válido.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1. Verificar que el juegoID sea válido y obtener el juego
        const juegoResponse = await fetch(`http://localhost:3001/juegos/${juegoId}`);
        if (!juegoResponse.ok) {
          throw new Error("No se pudo obtener el juego.");
        }
        const juegoData = await juegoResponse.json();
        setJuego(juegoData);

        // 2. Obtener los torneos del juego
        const torneosResponse = await fetch(`http://localhost:3001/torneos/${juegoId}`);
        if (!torneosResponse.ok) {
          throw new Error("No se pudieron obtener los torneos.");
        }
        const torneosData = await torneosResponse.json();
        setTorneos(torneosData);

        // 3. Obtener los equipos (suponiendo que tienes un endpoint para obtener todos los equipos)
        const equiposResponse = await fetch(`http://localhost:3001/equipos`);
        if (!equiposResponse.ok) {
          throw new Error("No se pudieron obtener los equipos.");
        }
        const equiposData = await equiposResponse.json();

        // Convertir la lista de equipos a un objeto con los _id como claves para fácil acceso
        const equiposObj = equiposData.reduce((acc, equipo) => {
          acc[equipo._id] = equipo;
          return acc;
        }, {});
        setEquipos(equiposObj);

      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [juegoId]); // Dependemos de juegoId para recargar la información cuando cambie

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!juego) {
    return <div>No se encontró el juego.</div>;
  }

  const openPopup = (torneo) => {
    setSelectedTorneo(torneo);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTorneo(null);
  };

  // Función para unir al torneo
  const unirseATorneo = async () => {
    if (!perfil || !perfil.equipo) {
      alert("Debes estar logueado con un equipo para unirte a un torneo.");
      return;
    }

    const equipoId = perfil.equipo._id; // Asegúrate de que este dato esté correctamente configurado
    const torneoId = selectedTorneo._id;

    try {
      const response = await fetch(`http://localhost:3001/torneos/${torneoId}/unirse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ equipoId }),
      });

      if (!response.ok) {
        throw new Error("No se pudo unir al torneo.");
      }

      const updatedTorneo = await response.json();
      setSelectedTorneo(updatedTorneo); // Actualiza el torneo con el equipo unido
      alert("¡Te has unido al torneo con éxito!");
    } catch (err) {
      console.error("Error al unirse al torneo:", err);
      alert("Hubo un error al unirse al torneo.");
    }
  };

  return (
    <main>
      <div className="torneos">
        <h1>{juego.nombre}</h1>
        <h2>Torneos disponibles</h2>
        {torneos.length === 0 ? (
          <p>No hay torneos disponibles para este juego.</p>
        ) : (
          <ul>
            {torneos.map((torneo) => (
              <li key={torneo._id}>
                <strong>{torneo.tipoTorneo}</strong> - Fecha: {new Date(torneo.fecha).toLocaleDateString()}
                {/* Solo un botón para ver más y abrir el popup */}
                <button className="boton" onClick={() => openPopup(torneo)}>Ver más</button>
              </li>
            ))}
          </ul>
        )}
      </div>
     

      {/* Popup de Torneo */}
      {showPopup && selectedTorneo && (
        <div className="popup">
          <div className="popup-content">
            <h3>Torneo: {selectedTorneo.tipoTorneo}</h3>
            <p>Fecha: {new Date(selectedTorneo.fecha).toLocaleDateString()}</p>
            <h4>Equipos Participantes:</h4>
            <ul>
              {selectedTorneo.equipos && selectedTorneo.equipos.length > 0 ? (
                selectedTorneo.equipos.map((equipoData) => {
                  const equipo = equipos[equipoData.equipo];  // Obtener el equipo completo desde el estado
                  return equipo ? <li key={equipo._id}>{equipo.nombre}</li> : <li key={equipoData.equipo}>Equipo no encontrado</li>;
                })
              ) : (
                <p>No hay equipos disponibles en este torneo.</p>
              )}
            </ul>
            <button onClick={unirseATorneo}>Unirse al Torneo</button> {/* Botón para unirse al torneo */}
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PageTorneosJuego;
