import React from 'react';
import './SuccessPopup.css';  // Asegúrate de tener un archivo CSS para los estilos

const SuccessPopup = ({ message }) => {
  return (
    <div className="success-popup">
      <p>{message}</p>
    </div>
  );
};

export default SuccessPopup;
