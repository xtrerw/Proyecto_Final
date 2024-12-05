import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PageTorneosJuego.css";

const PageTorneosJuego = ({ perfil }) => {  // Recibe perfil como prop

  const { juegoId } = useParams();
  const [torneos, setTorneos] = useState([]);
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [equipos, setEquipos] = useState([]);  // Inicializar como array vacío
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTorneo, setSelectedTorneo] = useState(null);

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
        // Obtener el juego
        const juegoResponse = await fetch(`http://localhost:3001/juegos/${juegoId}`);
        if (!juegoResponse.ok) {
          throw new Error("No se pudo obtener el juego.");
        }
        const juegoData = await juegoResponse.json();
        setJuego(juegoData);

        // Obtener los torneos
        const torneosResponse = await fetch(`http://localhost:3001/torneos/${juegoId}`);
        if (!torneosResponse.ok) {
          throw new Error("No se pudieron obtener los torneos.");
        }
        const torneosData = await torneosResponse.json();
        setTorneos(torneosData);

        // Obtener los equipos
        const equiposResponse = await fetch(`http://localhost:3001/equipos`);
        if (!equiposResponse.ok) {
          throw new Error("No se pudieron obtener los equipos.");
        }
        const equiposData = await equiposResponse.json();

        // Convertir la lista de equipos a un objeto con los _id como claves
        const equiposObj = equiposData.reduce((acc, equipo) => {
          acc[equipo._id] = equipo;
          return acc;
        }, []);
        setEquipos(equiposObj);  // Actualizar el estado con los equipos
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [juegoId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!juego) return <div>No se encontró el juego.</div>;

  const openPopup = (torneo) => {
    setSelectedTorneo(torneo);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTorneo(null);
  };

  const unirseATorneo = async () => {
    // Verificar si el jugador tiene un equipo asignado
    if (!perfil || !perfil.equipo) {
      alert("Debes estar logueado con un equipo para unirte a un torneo.");
      return;
    }

    // Buscar el equipo del jugador usando el ID del equipo
    const equipoDelJugador = equipos[perfil.equipo];  // Accedemos al equipo directamente por su ID

    if (!equipoDelJugador) {
      alert("No tienes un equipo asignado. Debes unirte a un equipo primero.");
      return;
    }

    const equipoId = equipoDelJugador._id; // Obtener ID del equipo
    const torneoId = selectedTorneo._id; // Obtener ID del torneo seleccionado

    try {
      const response = await fetch(`http://localhost:3001/unirEquipoTorneo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ torneoId, equipoId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "No se pudo unir al torneo.");
      }

      const updatedTorneo = await response.json();
      setSelectedTorneo(updatedTorneo);
      alert("¡Tu equipo se ha unido al torneo con éxito!");

      // Actualizar la lista de torneos para reflejar el cambio
      setTorneos((prevTorneos) =>
        prevTorneos.map((torneo) =>
          torneo._id === updatedTorneo._id ? updatedTorneo : torneo
        )
      );
    } catch (err) {
      console.error("Error al unirse al torneo:", err);
      alert(err.message || "Hubo un error al unirse al torneo.");
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
                <button className="boton" onClick={() => openPopup(torneo)}>
                  Ver más
                </button>
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
                  const equipo = equipos[equipoData.equipo];
                  return equipo ? (
                    <li key={equipo._id}>{equipo.equipo}</li>
                  ) : (
                    <li key={equipoData.equipo}>Equipo no encontrado</li>
                  );
                })
              ) : (
                <p>No hay equipos inscritos en este torneo.</p>
              )}
            </ul>
            <button onClick={unirseATorneo}>Unirse al Torneo</button>
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PageTorneosJuego;
