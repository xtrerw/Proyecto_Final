/* eslint-disable react/prop-types */
import { useRef } from "react";
import { FaSearch } from "react-icons/fa"; // Importa el ícono de búsqueda de Font Awesome

function CardSearch(props) {
  const inputRef = useRef(null);
  return (
    <div className="card-search">
      <input
        type="text"
        placeholder="Buscar juego..."
        ref={inputRef}
        onChange={(e) => props.searchGame(e.target.value)}
      />
      <FaSearch className="search-icon" />
      {/* Icono de lupa */}
      {/* Puedes agregar un botón de búsqueda si es necesario */}
    </div>
  );
}

export default CardSearch;
