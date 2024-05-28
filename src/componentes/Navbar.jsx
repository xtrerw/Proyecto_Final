import React, { useEffect, useState } from "react";
import Button from "./Button";
import menuItems from "./MenuItems";
import "./Navbar.css";
import { Link, Route, Routes } from "react-router-dom";
import Games from "../PageJuegos";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

    //session
    const userID=useLocation().state?.userID
    //pedir la img o nombre de usuario
    const [perfil,setPerfil]=useState({});
    useEffect(()=>{
      if (userID) {
        //para enviar id a node js
        fetch(`http://localhost:3001/perfil?id=${userID}`)
        .then(response => response.json())
        .then((dato)=>{
          setPerfil(dato);
          console.log(dato);
        }
      )
        .catch((error) => console.error(error))
      }
    },[])
  return (
    <nav className="navbar">
      <Link to={'/'} className="navbar-logo">
        OnlyGG
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={active ? "nav-menu active" : "nav-menu"}>
        {/* hago que los routers funcionen bien mediante la etiqueta de Link */}
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link to={`/${item.title}`} className={item.cName}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      
      {userID? 
      <div className="perfil">
        <motion.div 
      className='img-perfil'
      animate={{
        scale: [1, 1.2, 1, 1.2, 1],
        rotate: [0, -360, 360, 360, 0],
        borderRadius: ["50%", "30%", "20%", "10%", "50%"],
        backgroundImage: `url(../${perfil.img})`,
        boxShadow: ['inset 0 0 1px 5px rebeccapurple','inset 0 0 1px 5px var(--main-color)','inset 0 0 1px 5px burlywood','inset 0 0 1px 5px palevioletred'],
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatDelay:1,
        ease: "anticipate",
      }}
      ></motion.div>
      <motion.p>
        {perfil.nombre}
        <br />
        {perfil.ptos} ptos
      </motion.p>
      </div>
       :
        <Link to={'/Registro'}>
          <Button>
            SIGN UP
          </Button>
        </Link>}
      
    </nav>
  );
};

export default Navbar;
