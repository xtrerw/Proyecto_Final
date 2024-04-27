import React from 'react';
import './tienda.css';
const figuras=[
    "src/img/figura1.png",
    "src/img/figura2.png",
    "src/img/figura3.png"
    ];
const Tienda = () => {
  return (
    <section className='tienda'>
      <div className='tienda-titulo'>
        <h1>Tienda</h1>
        <p>Gana increibles premios participando en nuestra tienda</p>
      </div>
      <div className='tienda-img'>
        {figuras.map((figura,index) =><img key={index} src={figura} />)}
      </div>
    </section>
  )
}

export default Tienda
