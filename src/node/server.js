import mongoose from 'mongoose';

// Conexión a la base de datos MongoDB Atlas
const user = encodeURIComponent("root"); // Usuario de MongoDB Atlas
const password = encodeURIComponent("root"); // Contraseña del usuario
const nombreBD = "OnlyGG"; // Nombre de la base de datos
const url = `mongodb+srv://root:root@cluster0.ympghld.mongodb.net/${nombreBD}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conexión exitosa con MongoDB Atlas");
}).catch(err => {
  console.error("Error de conexión:", err);
});

// Definir esquemas y modelos
const Schema = mongoose.Schema;

// Esquema para los jugadores
const jugadorSchema = new Schema({
  nombre: String,
  apellidos: String,
  año: Number,
  nacionalidad: String
});

// Esquema para los equipos
const equipoSchema = new Schema({
  equipo: String,
  jugador: [String], // Debido a que un equipo puede tener muchos jugadores
  tipoJuego: String
});

// Esquema para los torneos
const torneoSchema = new Schema({
  equipos: [String], // Debido a que un torneo puede tener 2 o más equipos
  tipoJuego: String,
  fecha: String,
  tipoTorneo: String
});

// Esquema para las noticias
const noticiaSchema = new Schema({
  img: String,
  titulo: String,
  contenido: String,
  tipoJuego: String,
  fecha: String
});

// Esquema para la tienda
const tiendaSchema = new Schema({
  nombre: String,
  img: String,
  precio: Number,
  caracteristica: String,
  tipoJuego: String,
  clasificacion: String,
  altura: Number,
  anchura: Number,
  profundidad: Number,
  size: String
});

// Esquema para los juegos
const juegoSchema = new Schema({
  nombre: String,
  imagen: String
});

// Modelos
const Jugador = mongoose.model("Jugador", jugadorSchema);
const Equipo = mongoose.model("Equipo", equipoSchema);
const Torneo = mongoose.model("Torneo", torneoSchema);
const Noticia = mongoose.model("Noticia", noticiaSchema);
const Tienda = mongoose.model("Tienda", tiendaSchema);
const Juego = mongoose.model("Juego", juegoSchema);

// Insertar datos solo si no existen registros previos
async function insertarDatosSiNoExisten(modelo, datos) {
  try {
    const count = await modelo.countDocuments();
    if (count === 0) {
      await modelo.insertMany(datos);
      console.log(`${datos.length} registros insertados en ${modelo.collection.name}`);
    } else {
      console.log(`Ya existen datos en ${modelo.collection.name}. No se realizaron cambios.`);
    }
  } catch (error) {
    console.error(`Error al insertar datos en ${modelo.collection.name}:`, error);
  }
}

// Datos a insertar
const jugadores = [
    { nombre: "Gabriel", apellidos: "Rodriguez", año: 23, nacionalidad: "Español" },
    { nombre: "Santiago", apellidos: "Daza", año: 19, nacionalidad: "UK" },
    // Agrega más documentos de jugadores aquí
];
const equipos = [
    { equipo: "Dragonslayer Legion", jugador: ["Gabriel", "Wei", "Santiago", "Sherik", "Franch"], tipoJuego: "League of Legends" },
    { equipo: "Rogue Synapse", jugador: ["Makoto", "Min-soo", "Leon", "Mundo", "José"], tipoJuego: "League of Legends" },
    // Agrega más documentos de equipos aquí
];
const torneos = [
    { equipos: ["Dragonslayer Legion", "Rogue Synapse"], tipoJuego: "League of Legends", fecha: "2024-05-01", tipoTorneo: "Playoffs" },
    { equipos: ["Neon Ninja", "Neko Neko"], tipoJuego: "TFT", fecha: "2024-05-03", tipoTorneo: "Playoffs" },
    // Agrega más documentos de torneos aquí
  
];
const noticias = [
    { img: "ruta/de/imagen1.jpg", titulo: "Título de noticia 1", contenido: "Contenido de noticia 1", tipoJuego: "League of Legends", fecha: "2024-05-01" },
    { img: "ruta/de/imagen2.jpg", titulo: "Título de noticia 2", contenido: "Contenido de noticia 2", tipoJuego: "TFT", fecha: "2024-05-03" },
    // Agrega más documentos de noticias aquí
];
const tienda = [
    { nombre: "Figura de Aatrox", img: "ruta/de/imagen3.jpg", precio: 100, caracteristica: "Efectos de iluminación led", tipoJuego: "League of Legends", clasificacion: "Figura de acción", altura: 46, anchura: 37.6, profundidad: 32.2 },
    { nombre: "Camiseta de Tahm Kench", img: "ruta/de/imagen4.jpg", precio: 20, caracteristica: "100% algodón", tipoJuego: "League of Legends", clasificacion: "Ropa", size: "M" },
    // Agrega más documentos de tienda aquí
];
const juegos = [
  {
    nombre: 'League of Legends',
    imagen: 'ruta/de/imagen/para/league-of-legends.jpg'
  },
  {
    nombre: 'Valorant',
    imagen: 'ruta/de/imagen/para/valorant.jpg'
  },
  {
    nombre: 'Teamfight Tactics',
    imagen: 'ruta/de/imagen/para/tft.jpg'
  }
];

// Insertar datos si no existen
insertarDatosSiNoExisten(Jugador, jugadores);
insertarDatosSiNoExisten(Equipo, equipos);
insertarDatosSiNoExisten(Torneo, torneos);
insertarDatosSiNoExisten(Noticia, noticias);
insertarDatosSiNoExisten(Tienda, tienda);
insertarDatosSiNoExisten(Juego, juegos);

// Exportar modelos si es necesario
export { Jugador, Equipo, Torneo, Noticia, Tienda, Juego };
