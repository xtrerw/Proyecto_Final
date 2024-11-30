import React, { useEffect, useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import "./TopPremio.css";
import { motion } from 'framer-motion';
import { Link, Route, Routes } from 'react-router-dom';
const topPremio = () => {
    const [tienda, setProducto]=useState([]);
      useEffect(()=>{
          fetch('http://localhost:3001/tienda')
          .then(response => response.json())
          .then(
            tienda =>{
                const topPremio= tienda.filter(item => item.precio>200)
                setProducto(topPremio);
            })
          .catch(error => {
              console.error('error:', error);
          });
      },[]);

      const [pos, cambioPos]=useState(-1);
      const next = () => {
        cambioPos((index) => {
            if (index < 1) {
                return (index + 1) % tienda.length;
            }
            return index;
        });        
      };
      
      const back = () => {
        cambioPos((index) => {
            if (index>-1) {
             return (index-1 ) % tienda.length;   
            }
            return index})
      };

      
  return (
    <main className="top-premios">
        <h1>Top Premios</h1>
        <div className='top-premio-parte'>
          {tienda.map((item,index)=>(
              <Link to={`${item._id}`} key={index} style={{
                backgroundImage:`url(${item.imgBg})`,
                transform: `translateX(${-pos*100}%)
                scale(${index == pos+1 ? 0.8 : 0.6})`,
                transition: 'transform 2s ease',
                }} className="top-premio"
                
                >
                <motion.img src={item.img} whileHover={{
                    scale:1.1,
                    cursor:"pointer",
                    transition: 'transform 3s ease',
                }}/>
              </Link>))}
        </div>
        <div className='btn-top'>
            <div onClick={back} className="btn-top-back"><i className='bx bxs-chevron-left' ></i></div>
            <div onClick={next} className="btn-top-next"><i className='bx bxs-chevron-right' ></i></div>
          </div>
      </main>
  )
}

export default topPremio
