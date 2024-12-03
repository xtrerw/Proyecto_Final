import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PageDetallesTorneo = () => {
  const { id } = useParams();  // Obtén el id del torneo desde la URL
  const [torneo, setTorneo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTorneoDetails = async () => {
      try {
        const response = await fetch(`/api/torneo/${id}`); // Asegúrate de que esta ruta es la correcta
        if (!response.ok) {
          throw new Error('No se pudo obtener el torneo');
        }
        const data = await response.json();
        setTorneo(data);  // Guarda los datos del torneo
      } catch (error) {
        setError(error.message); // Maneja el error si algo sale mal
      }
    };

    fetchTorneoDetails();
  }, [id]);

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (!torneo) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalles del Torneo</h1>
      <h2>{torneo.nombre}</h2>
      <h3>Equipos Participantes:</h3>
      <ul>
        {torneo.equipos && torneo.equipos.map((equipo, index) => (
          <li key={index}>{equipo.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default PageDetallesTorneo;
