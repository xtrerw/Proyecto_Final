import React from 'react';

function Card({ imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card" />
    </div>
  );
}

export default Card;