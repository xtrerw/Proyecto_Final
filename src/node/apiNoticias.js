
import ServerMod from "./server.js";
import express from "express";
import cors from "cors";
const app = express();//crear una instancia de la Express y almacena en la "app"
app.use(cors());//permiten intercambio de los datos entre diferentes dominios
app.use(express.json()); //analizar cuerpo de las solicitudes, lo analizar'a como json 
app.get('/noticias', async (req, res) => {
  try {
      const noticias = await ServerMod.NoticiasModulo.find({});
      res.json(noticias);
  } catch (error) {
      res.status(500).json({ message: 'error', error: error.toString() });
  }
});
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;//configurar el n'umero de puerto. Intenta obtener el número puerto. Si no, se utilizará el puerto 3001
app.listen(PORT, () => console.log(`Ya está realizando en el puerto de servidor ${PORT}`));//comprobar que servidor si está ejecutando bien.