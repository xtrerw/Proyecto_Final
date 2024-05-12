
import ServerMod from "./server.js";
import express from "express";
import cors from "cors";
const app = express();//crear una instancia de la Express y almacena en la "app"
app.use(cors());//permiten intercambio de los datos entre diferentes dominios
app.use(express.json()); //analizar cuerpo de las solicitudes, lo analizar'a como json 
//api de noticias
app.get('/noticias', (req, res) => {

      const noticias = ServerMod.NoticiasModulo.find({});
      res.json(noticias);
});
//api de tienda
app.get('/tienda', (req, res) => {
      const tienda= ServerMod.TiendaModulo.find();
      res.json(tienda);
});
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;//configurar el n'umero de puerto. Intenta obtener el número puerto. Si no, se utilizará el puerto 3001
app.listen(PORT, () => console.log(`Ya está realizando en el puerto de servidor ${PORT}`));//comprobar que servidor si está ejecutando bien.