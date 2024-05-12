import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Importa el ícono de búsqueda de Font Awesome

function CardSearch() {
  return (
    <div className="card-search">
      <input type="text" placeholder="Buscar juego..." />
      <FaSearch className="search-icon" /> {/* Icono de lupa */}
      {/* Puedes agregar un botón de búsqueda si es necesario */}
    </div>
  );
}

export default CardSearch;