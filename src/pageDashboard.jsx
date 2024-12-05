import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/pageDashboard.css";
import SuccessPopup from "./componentes_paginas/SuccessPopup";
import TituloPaginas from "./componentes_paginas/tituloPaginas";

const Juegos = () => {
  const [torneos, setTorneos] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipoTorneo: "",
    fecha: "",
    juego: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Definir cuántos torneos mostrar por página

  const state = {
    img: "src/img/bg1.png",
    title: "Dashboard",
    description: "Descubre tu potencial en los juegos",
  };

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const response = await fetch("http://localhost:3001/torneos");
        if (!response.ok) {
          throw new Error("Error al obtener los torneos");
        }
        const data = await response.json();
        setTorneos(data);
      } catch (error) {
        console.error("Error al cargar los torneos:", error);
      }
    };

    const fetchJuegos = async () => {
      try {
        const response = await fetch("http://localhost:3001/juegos");
        if (!response.ok) {
          throw new Error("Error al obtener los juegos");
        }
        const data = await response.json();
        setJuegos(data);
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
      }
    };

    fetchTorneos();
    fetchJuegos();
  }, []);

  // Paginación: calcular los torneos que deben mostrarse en la página actual
  const indexOfLastTorneo = currentPage * itemsPerPage;
  const indexOfFirstTorneo = indexOfLastTorneo - itemsPerPage;
  const currentTorneos = torneos.slice(indexOfFirstTorneo, indexOfLastTorneo);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tipoTorneo || !formData.fecha || !formData.juego) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const fechaString = new Date(formData.fecha).toISOString().split("T")[0];
    const data = {
      tipoTorneo: formData.tipoTorneo,
      fecha: fechaString,
      tipoJuego: formData.juego,
    };

    try {
      const response = await fetch("http://localhost:3001/crearTorneo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear el torneo");
      }

      const responseData = await response.json();
      setTorneos((prevTorneos) => [...prevTorneos, responseData]);
      setSuccessMessage("¡Torneo creado con éxito!");
      setIsModalOpen(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  // Calcular el total de páginas
  const totalPages = Math.ceil(torneos.length / itemsPerPage);

  return (
    <>
      <TituloPaginas
        img={state.img}
        titulo={state.title}
        des={state.description}
      />
      <div className="torneos-activos">
        {currentTorneos.length > 0 ? (
          currentTorneos.map((torneo) => (
            <Link
              key={torneo._id}
              to={`/torneo/${torneo._id}`}
              className="torneo-card-link"
            >
              <div className="torneo-card">
                <h3>{torneo.tipoTorneo}</h3>
                <p>Juego: {torneo.tipojuego}</p>
                <p>Fecha: {new Date(torneo.fecha).toLocaleDateString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay torneos activos en este momento.</p>
        )}
        <button className="crear-torneo-btn" onClick={handleOpenModal}>
          Crear Torneo
        </button>

        {/* Paginación */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Crear Torneo</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="tipoTorneo">Tipo de Torneo</label>
                <input
                  type="text"
                  id="tipoTorneo"
                  name="tipoTorneo"
                  value={formData.tipoTorneo}
                  onChange={handleInputChange}
                  placeholder="Escribe el tipo de torneo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="torneoFecha">Fecha</label>
                <input
                  type="date"
                  id="torneoFecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="torneoJuego">Juego</label>
                <select
                  id="torneoJuego"
                  name="juego"
                  value={formData.juego}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona un juego</option>
                  {juegos.length > 0 ? (
                    juegos.map((juego, index) => (
                      <option key={index} value={juego.nombre}>
                        {juego.nombre}
                      </option>
                    ))
                  ) : (
                    <option>No hay juegos disponibles</option>
                  )}
                </select>
              </div>

              <button type="submit" className="crear-torneo-btn">
                Crear Torneo
              </button>

              <button
                type="button"
                className="cerrar-modal-btn"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}

      {successMessage && (
        <SuccessPopup message={successMessage} />
      )}
    </>
  );
};

export default Juegos;
