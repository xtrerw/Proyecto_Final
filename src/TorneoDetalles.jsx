import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TorneoDetalles.css';

const TorneoDetalles = () => {
  const { id } = useParams(); // Obtener el ID del torneo desde la URL
  const [torneo, setTorneo] = useState(null);
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEquipo, setSelectedEquipo] = useState(null); // Para almacenar el equipo seleccionado
  const [newPuntos, setNewPuntos] = useState(0); // Para los puntos que se van a dar

  useEffect(() => {
    const fetchTorneoDetails = async () => {
      try {
        if (!id) {
          setError('ID del torneo es necesario');
          return;
        }

        const response = await fetch(`http://localhost:3001/torneo/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los detalles del torneo");
        }

        const data = await response.json();
        console.log("Datos del Torneo:", data); // Ver los datos del torneo

        setTorneo(data);
        setEquipos(data.equipos || []);  // Si no hay equipos, asigna un array vacío
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError('Error al cargar los detalles del torneo');
      }
    };

    fetchTorneoDetails();
  }, [id]);

  const handleOpenModal = (equipo) => {
    console.log("Equipo seleccionado:", equipo); // Verifica el formato del equipo
    setSelectedEquipo(equipo);
  };

  const handleCloseModal = () => {
    setSelectedEquipo(null);
    setNewPuntos(0);
  };

  const handleSubmitPuntos = async () => {
    if (selectedEquipo && selectedEquipo.equipo) {
      try {
        // Llamar a la API para actualizar los puntos del equipo
        const response = await fetch(`http://localhost:3001/torneo/${id}/equipos/${selectedEquipo.equipo._id}/puntos`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ puntos: newPuntos }),
        });

        if (!response.ok) {
          throw new Error("Error al actualizar los puntos");
        }

        // Actualizar el estado después de modificar los puntos
        const updatedTorneo = await response.json();
        setTorneo(updatedTorneo);
        setEquipos(updatedTorneo.equipos);
        handleCloseModal();
      } catch (error) {
        console.error("Error al dar puntos al equipo:", error);
      }
    }
  };

  const handleEliminarEquipo = async () => {
    if (selectedEquipo && selectedEquipo.equipo) {
      try {
        const response = await fetch(`http://localhost:3001/torneo/${id}/equipos/${selectedEquipo.equipo._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el equipo");
        }

        const updatedTorneo = await response.json();
        setTorneo(updatedTorneo);
        setEquipos(updatedTorneo.equipos);
        handleCloseModal();
      } catch (error) {
        console.error("Error al eliminar el equipo:", error);
      }
    } else {
      console.error("No se ha seleccionado un equipo válido para eliminar");
    }
  };

  return (
    <div className="torneo-container">
      {error && <p className="error-message">{error}</p>}
      {torneo ? (
        <div>
          <h1>Detalles del Torneo</h1>
          <p>Fecha: {new Date(torneo.fecha).toLocaleDateString()}</p>
          <p>Tipo de Torneo: {torneo.tipoTorneo}</p>
          <h2>Equipos Participantes</h2>
          <ul className="equipos-list">
            {equipos.length > 0 ? (
              equipos.map((equipo, index) => (
                <li key={index}>
                  {equipo.equipo ? equipo.equipo : "Equipo no encontrado"} - Puntos: {equipo.puntos}
                  <button onClick={() => handleOpenModal(equipo)}>Modificar</button>
                </li>
              ))
            ) : (
              <li>No hay equipos registrados.</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Cargando detalles del torneo...</p>
      )}

      {/* Modal para modificar puntos o eliminar equipo */}
      {selectedEquipo && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Modificar Equipo: {selectedEquipo.equipo}</h2>
            <div>
              <label>Puntos</label>
              <input 
                type="number" 
                value={newPuntos} 
                onChange={(e) => setNewPuntos(e.target.value)} 
                min="0" 
              />
            </div>
            <button onClick={handleSubmitPuntos}>Asignar Puntos</button>
            <button onClick={handleEliminarEquipo}>Eliminar Equipo</button>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TorneoDetalles;
