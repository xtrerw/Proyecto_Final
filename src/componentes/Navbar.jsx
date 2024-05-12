import React, { useState } from "react";
import Button from "./Button";
import menuItems from "./MenuItems";
import "./Navbar.css";
import { Link, Route, Routes } from "react-router-dom";
import Games from "../PageJuegos";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

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
      
        <Link to={'/Registro'}>
          <Button>
            SIGN UP
          </Button>
        </Link>
      
    </nav>
  );
};

export default Navbar;
