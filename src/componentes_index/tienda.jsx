import React from 'react';
import './tienda.css';
import { Link } from 'react-router-dom';
const figuras=[
    "src/img/figura1.png",
    "src/img/figura2.png",
    "src/img/figura3.png"
    ];
const Tienda = () => {
  return (
    <section className='tienda'>
      <Link to={"/Tienda"} className='tienda-titulo'>
        <h1>Tienda</h1>
        <p>Gana increibles premios participando en nuestra tienda</p>
      </Link>
      <div className='tienda-img'>
        {figuras.map((figura,index) =><img key={index} src={figura} />)}
      </div>
    </section>
  )
}

export default Tienda
