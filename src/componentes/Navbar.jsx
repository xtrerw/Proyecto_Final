import React, { useEffect, useState } from "react";
import Button from "./Button";
import menuItems from "./MenuItems";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Navbar = (propsNavbar) => {
  const resultaPtos = useSelector((state) => state);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const [contar, setContar] = useState(0);
  const [animaInicio, iniciarAnima] = useState(false);

  useEffect(() => {
    if (propsNavbar && contar < propsNavbar.ptos && !animaInicio) {
      const time = setTimeout(() => {
        setContar(contar + 1);
      }, 2);
      return () => clearTimeout(time);
    } else if (resultaPtos >= 0 && contar > resultaPtos) {
      iniciarAnima(true);
      const time = setTimeout(() => {
        setContar(contar - 1);
      }, 2);
      return () => clearTimeout(time);
    }
  }, [animaInicio, contar, propsNavbar, resultaPtos]);

  return (
    <nav className="navbar">
      <Link to={`/`} className="navbar-logo">
        OnlyGG
      </Link>
      <div className="menu-icon" onClick={handleClick}>
       |||<i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={active ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={`/${item.title}`} className={item.cName}>
              {item.title}
            </Link>
          </li>
        ))}
        {propsNavbar && propsNavbar.nombre !== undefined ? (
          <li>
            <Link to={"/modifica"} className="perfil">
              <motion.div
                className="img-perfil"
                animate={{
                  scale: [1, 1.2, 1, 1.2, 1],
                  rotate: [0, -360, 360, 360, 0],
                  borderRadius: ["50%", "30%", "20%", "10%", "50%"],
                  backgroundImage: `url(../${propsNavbar.img})`,
                  boxShadow: [
                    "inset 0 0 1px 5px var(--main-color)",
                    "inset 0 0 1px 3px orange",
                    "inset 0 0 1px 3px burlywood",
                    "inset 0 0 1px 3px #fff",
                  ],
                }}
                transition={{
                  duration: 5,
                  ease: "anticipate",
                }}
              ></motion.div>
              <motion.p>
                {propsNavbar.nombre}
                <br />
                {contar} ptos
              </motion.p>
            </Link>
          </li>
        ) : (
          <li>
            <Link to={"/Registro"} className="nav-links btn btn-primary">
              sign up
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
