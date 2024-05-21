
import ServerMod from "./server.js";
import express from "express";
import cors from "cors";
const app = express();//crear una instancia de la Express y almacena en la "app"
app.use(cors());//permiten intercambio de los datos entre diferentes dominios
app.use(express.json()); //analizar cuerpo de las solicitudes, lo analizar'a como json 
//api de noticias
app.get('/noticias', async (req, res) => {
      try {
          const noticias = await ServerMod.NoticiasModulo.find({}); // Assuming it returns a cursor like MongoDB
          res.json(noticias);
      } catch (error) {
          console.error('Error de noticias:', error);
          res.status(500).json({ error: 'Servidor error' });
      }
  });
 //api de tienda 
  app.get('/tienda', async (req, res) => {
      try {
          const tienda = await ServerMod.TiendaModulo.find({}); // Assuming it returns a cursor
          res.json(tienda);
      } catch (error) {
          console.error('Error de tienda:', error);
          res.status(500).json({ error: 'Servidor error' });
      }
  });
  
  app.get('/juegos', async (req, res) => {
    try {
        const juegos = await ServerMod.JuegoModelo.find({}); // Assuming it returns a cursor
        res.json(juegos);
    } catch (error) {
        console.error('Error de juegos:', error);
        res.status(500).json({ error: 'Servidor error' });
    }
});

// API para manejar el registro
app.post('/jugador', async (req, res) => {
    try {
        const { nombre, apellidos, correo, confirmaCorreo, contrasena, confirmaContrasena, userName } = req.body;

        // Aquí puedes agregar lógica para almacenar estos datos en tu base de datos
        // Ejemplo:
        // const nuevoUsuario = new UsuarioModelo({ nombre, apellidos, correo, contrasena, userName });
        // await nuevoUsuario.save();

        res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error de registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

  
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;//configurar el n'umero de puerto. Intenta obtener el número puerto. Si no, se utilizará el puerto 3001
app.listen(PORT, () => console.log(`Ya está realizando en el puerto de servidor ${PORT}`));//comprobar que servidor si está ejecutando bien.