import React, { useEffect, useState } from "react";
import Button from "./Button";
import menuItems from "./MenuItems";
import "./Navbar.css";
import { Link, Route, Routes } from "react-router-dom";
import Games from "../PageJuegos";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Navbar = (propsNavbar) => {
  console.log(propsNavbar);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

    
    //animaci'on de ptos de usuarios
    const [contar,setContar]=useState(0)
    useEffect(()=>{
      if (propsNavbar && propsNavbar.ptos!=undefined && contar<propsNavbar.ptos) {
        //establece el tiempo de aumentar 1 a 1
        //acerelador increible
        const time= setTimeout(()=>{setContar(contar+1)},20)
        return ()=>clearTimeout(time)
      }
    },[contar, propsNavbar])
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
      {/* si ya pone props que pasa desde la pagina home, se aparece la información de usuario */}
      {propsNavbar && propsNavbar.nombre!=undefined? 
      <Link to={'/modifica'} className="perfil">
        <motion.div 
      className='img-perfil'
      animate={{
        scale: [1, 1.2, 1, 1.2, 1],
        rotate: [0, -360, 360, 360, 0],
        borderRadius: ["50%", "30%", "20%", "10%", "50%"],
        backgroundImage: `url(../${propsNavbar.img})`,
        boxShadow: ['inset 0 0 1px 5px var(--main-color)','inset 0 0 1px 3px orange','inset 0 0 1px 3px burlywood','inset 0 0 1px 3px #fff'],
      }}
      transition={{
        duration:5,
        ease: "anticipate",
      }}
      ></motion.div>
      <motion.p>
        {propsNavbar.nombre}
        <br />
        {contar} ptos
      </motion.p>
      </Link>
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
