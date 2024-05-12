import ServerMod from "./server.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tienda', async (req, res) => {
    try {
        const tienda= await ServerMod.TiendaModulo.find();
        res.json(tienda);
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.toString() });
    }
})
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 2000 ;
app.listen(PORT, function () {  
    console.log(`Ya está realizando en el puerto de servidor ${PORT}`);
})