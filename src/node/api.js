
import ServerMod from "./server.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json()); 
app.get('/noticias', async (req, res) => {
  try {
      const noticias = await ServerMod.NoticiasModulo.find({});
      res.json(noticias);
  } catch (error) {
      res.status(500).json({ message: 'error', error: error.toString() });
  }
});
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Ya está realizando en el puerto de servidor ${PORT}`));