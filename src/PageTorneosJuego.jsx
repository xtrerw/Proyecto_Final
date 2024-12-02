import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PageTorneosJuego.css";

const PageTorneosJuego = () => {
  const { juegoId } = useParams(); // Obtén el ID del juego desde la URL
  const [torneos, setTorneos] = useState([]);
  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Resetear error antes de realizar nuevas solicitudes

      try {
        // Obtener información del juego
        const juegoResponse = await fetch(`http://localhost:3001/juegos/${juegoId}`);
        if (!juegoResponse.ok) {
          throw new Error("No se pudo obtener el juego.");
        }
        const juegoData = await juegoResponse.json();
        setJuego(juegoData);

        // Obtener torneos del juego específico
        const torneosResponse = await fetch(`http://localhost:3001/torneos/${juegoId}`);
        if (!torneosResponse.ok) {
          throw new Error("No se pudieron obtener los torneos.");
        }
        const torneosData = await torneosResponse.json();
        setTorneos(torneosData);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message); // Captura y muestra el error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [juegoId]); // Vuelve a ejecutar el efecto cuando cambia el juegoId

  if (loading) {
    return <div>Cargando...</div>; // Mensaje mientras se carga la data
  }

  if (error) {
    return <div>Error: {error}</div>; // Si ocurre un error
  }

  if (!juego) {
    return <div>No se encontró el juego.</div>; // Si no hay juego
  }

  return (
    <main>
    <div className="torneos">
      <h1>{juego.nombre}</h1> {/* Nombre del juego */}
      <h2>Torneos disponibles</h2>
      {torneos.length === 0 ? (
        <p>No hay torneos disponibles para este juego.</p> // Mensaje cuando no hay torneos
      ) : (
        <ul>
          {torneos.map((torneo) => (
            <li key={torneo._id}>
              <strong>{torneo.tipoTorneo}</strong> - <span>Fecha: {new Date(torneo.fecha).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    </main>
  );
};

export default PageTorneosJuego;
