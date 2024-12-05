import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importar el contexto de autenticación
import '/src/PageAdmin.css';

const Admin = () => {
  const [pathDato, setPath] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirección
  const { login } = useAuth(); // Obtener la función para actualizar el estado de autenticación

  useEffect(() => {
    if (window.innerWidth > 1400) {
      setPath('M 20,0 0,50 L 0,600 L 460,600 500,500 500,0 Z');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Verifica que los datos de usuario y contraseña no estén vacíos
      if (!user || !password) {
        setError('Por favor ingresa ambos campos');
        return;
      }

      const response = await fetch('http://localhost:3001/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pwd: password }),
      });

      if (response.ok) {
        // Actualizar el estado de autenticación
        login();
        // Redirige al dashboard si la autenticación es exitosa
        navigate('/dashboard');
      } else {
        const errorMessage = await response.json();
        setError(errorMessage || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }
  };

  const labelAnimation = {
    aparece: {
      opacity: [0, 1],
      y: [50, 0],
      transition: { duration: 3, ease: 'anticipate', delay: 1 },
    },
  };

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    <main className="bg-admin">
      <motion.video
        className="bg-video"
        autoPlay
        loop
        muted
        initial={{ opacity: 0, width: '100%', height: '100%' }}
        animate={{
          opacity: [1, 1, 1, 1],
          width: ['80%', '100%'],
          height: ['80%', '100%'],
          borderRadius: ['30px', '0px'],
        }}
        transition={{ delay: 3, duration: 3, ease: 'anticipate' }}
      >
        <source src="../src/img/bg-admin.mp4" type="video/mp4" />
      </motion.video>
      <form className="admin-form" onSubmit={handleLogin}>
        <motion.svg className="admin-border" fill="#fff">
          <motion.path
            d={pathDato}
            animate={{
              stroke: ['#06ced4', '#c46fc6', 'var(--main-color)'],
              pathLength: [0, 1],
              strokeWidth: [50, 20],
              strokeOpacity: [0, 1],
            }}
            transition={{ duration: 3, ease: 'anticipate' }}
          />
        </motion.svg>
        <h2 className="admin-titulo">
          {'Administrador'.split('').map((sp, index) => (
            <motion.span
              key={index}
              animate={{
                color: ['#06ced4', '#c46fc6', 'var(--main-color)'],
                margin: [10, 20, 20, 2],
              }}
              transition={{
                duration: 3,
                ease: 'backInOut',
                delay: index / 10,
              }}
            >
              {sp}
            </motion.span>
          ))}
        </h2>
        <motion.label htmlFor="user-admin" variants={labelAnimation} animate="aparece">
          <motion.p
            animate={{ color: hover1 ? 'var(--main-color)' : '#c3c3c3' }}
          >
            Usuario
          </motion.p>
          <motion.input
            type="text"
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            animate={{
              boxShadow: hover1 ? 'inset 0 0px 1px 3px var(--main-color)' : 'none',
            }}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </motion.label>
        <motion.label htmlFor="pwd-admin" variants={labelAnimation} animate="aparece">
          <motion.p
            animate={{ color: hover2 ? 'var(--main-color)' : '#c3c3c3' }}
          >
            Contraseña
          </motion.p>
          <motion.input
            type="password"
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            animate={{
              boxShadow: hover2 ? 'inset 0 0px 1px 3px var(--main-color)' : 'none',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.label>
        {error && <motion.div className="error-message">{error}</motion.div>}
        <motion.button
          type="submit"
          className="btn-admin"
          variants={labelAnimation}
          animate="aparece"
          whileHover={{ backgroundColor: 'var(--main-color2)' }}
        >
          Iniciar sesión
        </motion.button>
      </form>
    </main>
  );
};

export default Admin;
