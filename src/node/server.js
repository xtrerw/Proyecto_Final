// Importa mongoose y otras dependencias necesarias
import mongoose from 'mongoose';

// Conexión a la base de datos MongoDB Atlas
const user = encodeURIComponent("root"); // Usuario de MongoDB Atlas
const password = encodeURIComponent("root"); // Contraseña del usuario
const nombreBD = "OnlyGG"; // Nombre de la base de datos
const url = `mongodb+srv://root:root@cluster0.ympghld.mongodb.net/${nombreBD}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conexión exitosa con MongoDB Atlas");
}).catch(err => {
    console.error("Error de conexión:", err);
});

// Función para agregar un documento a una colección solo si no existe
const agregarDocumentoSiNoExiste = (Modelo, nuevoDocumento) => {
    return Modelo.findOne({ nombre: nuevoDocumento.nombre })
        .then((documentoExistente) => {
            if (!documentoExistente) {
                // El documento no existe, se puede agregar
                return Modelo.create(nuevoDocumento);
            } else {
                console.log(`El documento ${nuevoDocumento.nombre} ya existe en la base de datos.`);
                return null;
            }
        })
        .then((resultado) => {
            if (resultado) {
                console.log(`documento ${nuevoDocumento.nombre} agregado correctamente a la colección ${Modelo.modelName}.`);
            }
        })
        .catch((error) => {
            console.error(`Error al agregar documento a la colección ${Modelo.modelName}:`, error);
        });
};

// Definir esquemas y modelos para todas las colecciones

// Jugadores
const jugadoresSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    año: Number,
    nacionalidad: String
});
const JugadorModulo = mongoose.model("jugadores", jugadoresSchema);

// Equipos
const equiposSchemas = new mongoose.Schema({
    equipo: String,
    jugador: [String],
    tipoJuego: String
});
const EquiposModulo = mongoose.model("equipos", equiposSchemas);

// Torneos
const torneosSchemas = new mongoose.Schema({
    equipos: [String],
    tipoJuego: String,
    fecha: String,
    tipoTorneo: String
});
const TorneosModulo = mongoose.model("torneos", torneosSchemas);

// Noticias
const noticiasSchemas = new mongoose.Schema({
    img: String,
    titulo: String,
    contenido: String,
    tipoJuego: String,
    fecha: String,
});
const NoticiasModulo = mongoose.model("noticias", noticiasSchemas);

// Tienda
const tiendaSchemas = new mongoose.Schema({
    nombre: String,
    img: String,
    precio: Number,
    caracteristica: String,
    tipoJuego: String,
    clasificacion: String,
    altura: Number,
    anchura: Number,
    profundidad: Number,
    size: String,
});
const TiendaModulo = mongoose.model('tienda', tiendaSchemas);

// Juegos
const juegoSchema = new mongoose.Schema({
    nombre: String,
    imagen: String,
});
const JuegoModelo = mongoose.model('Juego', juegoSchema);

// Ejemplo de uso para todas las colecciones

// Array de documentos a agregar para Jugadores
const nuevosJugadores = [
    {
        nombre: 'Nuevo Jugador',
        apellidos: 'Apellido Nuevo',
        año: 25,
        nacionalidad: 'Nueva Nacionalidad',
    },
    {
        nombre: 'Nuevo Jugador 2',
        apellidos: 'Apellido Nuevo 2',
        año: 22,
        nacionalidad: 'Nueva Nacionalidad 2',
    },
    // Agrega más jugadores aquí si es necesario
];

// Agregar múltiples jugadores
nuevosJugadores.forEach((jugador) => {
    agregarDocumentoSiNoExiste(JugadorModulo, jugador);
});

const nuevosEquipos = [
    {
        equipo: 'Nuevo Equipo 1',
        jugador: ['Jugador A', 'Jugador B'],
        tipoJuego: 'Nuevo Tipo de Juego 1',
    },
    {
        equipo: 'Nuevo Equipo 2',
        jugador: ['Jugador C', 'Jugador D'],
        tipoJuego: 'Nuevo Tipo de Juego 2',
    },
    // Agrega más equipos aquí si es necesario
];

// Agregar múltiples equipos
nuevosEquipos.forEach((equipo) => {
    agregarDocumentoSiNoExiste(EquiposModulo, equipo);
});


// Array de documentos a agregar para Noticias
const nuevasNoticias = [
    {
        img: 'ruta/de/imagen/para/nueva-noticia-1.jpg',
        titulo: 'Nueva Noticia 1',
        contenido: 'Contenido de la nueva noticia 1.',
        tipoJuego: 'Nuevo Tipo de Juego 1',
        fecha: '2024-05-12',
    },
    {
        img: 'ruta/de/imagen/para/nueva-noticia-2.jpg',
        titulo: 'Nueva Noticia 2',
        contenido: 'Contenido de la nueva noticia 2.',
        tipoJuego: 'Nuevo Tipo de Juego 2',
        fecha: '2024-05-13',
    },
    // Agrega más noticias aquí si es necesario
];

// Agregar múltiples noticias
nuevasNoticias.forEach((noticia) => {
    agregarDocumentoSiNoExiste(NoticiasModulo, noticia);
});

// Array de documentos a agregar para Torneos
const nuevosTorneos = [
    {
        equipos: ['Equipo A', 'Equipo B'],
        tipoJuego: 'Nuevo Tipo de Juego 1',
        fecha: '2024-05-15',
        tipoTorneo: 'Nuevo Tipo de Torneo 1',
    },
    {
        equipos: ['Equipo C', 'Equipo D'],
        tipoJuego: 'Nuevo Tipo de Juego 2',
        fecha: '2024-05-20',
        tipoTorneo: 'Nuevo Tipo de Torneo 2',
    },
    // Agrega más torneos aquí si es necesario
];

// Agregar múltiples torneos
nuevosTorneos.forEach((torneo) => {
    agregarDocumentoSiNoExiste(TorneosModulo, torneo);
});

// Array de documentos a agregar para Tienda
const nuevosProductos = [
    {
        nombre: 'Nuevo Producto 1',
        img: 'ruta/de/imagen/para/nuevo-producto-1.jpg',
        precio: 50,
        caracteristica: 'Nueva Característica 1',
        tipoJuego: 'Nuevo Tipo de Juego 1',
        clasificacion: 'Nueva Clasificación 1',
        altura: 10,
        anchura: 20,
        profundidad: 5,
        size: 'M',
    },
    {
        nombre: 'Nuevo Producto 2',
        img: 'ruta/de/imagen/para/nuevo-producto-2.jpg',
        precio: 70,
        caracteristica: 'Nueva Característica 2',
        tipoJuego: 'Nuevo Tipo de Juego 2',
        clasificacion: 'Nueva Clasificación 2',
        altura: 15,
        anchura: 25,
        profundidad: 6,
        size: 'L',
    },
    // Agrega más productos aquí si es necesario
];

// Agregar múltiples productos a la tienda
nuevosProductos.forEach((producto) => {
    agregarDocumentoSiNoExiste(TiendaModulo, producto);
});

//si quieres añadir mas cosas la añades al array wei
const nuevosJuegos = [
    {
        nombre: 'Dota 2',
        imagen: 'ruta/de/imagen/para/nuevo-juego-1.jpg',
    },
    {
        nombre: 'Free Fire',
        imagen: 'ruta/de/imagen/para/nuevo-juego-2.jpg',
    },
    {
        nombre: 'League of Legends',
        imagen: 'ruta/de/imagen/para/nuevo-juego-2.jpg',
    },
    {
        nombre: 'Valorant',
        imagen: 'ruta/de/imagen/para/nuevo-juego-2.jpg',
    },
    // Agrega más juegos aquí si es necesario
];

// Agregar múltiples juegos
nuevosJuegos.forEach((juego) => {
    agregarDocumentoSiNoExiste(JuegoModelo, juego);
});
  
// Exportar modelos si es necesario
export { JugadorModulo, EquiposModulo, NoticiasModulo, TorneosModulo, TiendaModulo, JuegoModelo };
