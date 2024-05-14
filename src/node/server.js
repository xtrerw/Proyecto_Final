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
        nombre: 'Figura de Aatrox a escala 1/6 de Jimei Palace',
        img: 'src/img/producto1.png',
        precio: 50,
        caracteristica: 'Efectos de iluminación led en la espada, los ojos y las alas.',
        tipoJuego: 'League of Legends',
        clasificacion: 'Figura de acción',
        altura: 46,
        anchura: 37.9,
        profundidad: 32.2,
        size: null,
    },
    {
        nombre: 'Alfombrilla para el ratón XL de Renekton sacamuelas',
        img: 'src/img/producto2.png',
        precio: 20,
        caracteristica: 'lustración del campeón Renekton sacamuelas. Estampado en licra. Borde con doble puntada que no se deshilacha. Base de goma antideslizante',
        tipoJuego: 'League of Legends',
        clasificacion: 'Periféricos',
        altura: 80,
        anchura: 30,
        profundidad: null,
        size: null,
    },
    {
        nombre: 'Camiseta de Tahm Kench maestro chef',
        img: 'src/img/producto3.png',
        precio: 70,
        caracteristica: 'Con un diseño del Rey del Río demostrando su gran amor por la cocina en la espalda, esta camiseta dejará bien claro que la compasión no tiene cabida entre fogones.',
        tipoJuego: 'League of Legends',
        clasificacion: 'Ropa',
        altura: null,
        anchura: null,
        profundidad: null,
        size: 'M',
    },
    {
        nombre: 'Conjunto de figuras de PureArts de Vi y Jinx a escala 1/6',
        img: 'src/img/producto4.png',
        precio: 70,
        caracteristica: 'Cohete y misil con iluminación led (Jinx). Guanteletes Atlas con iluminación led (Vi). Base de diorama que se puede unir a otra figura',
        tipoJuego: 'League of Legends',
        clasificacion: 'Figura de acción',
        altura: 50,
        anchura: 50,
        profundidad: 50,
        size: null,
    },
    {
        nombre: 'Figura Myethos de Ahri florecer espiritual a escala 1/7',
        img: 'src/img/producto5.png',
        precio: 100,
        caracteristica: 'Sentada entre flores de loto, Ahri florecer espiritual está rodeada de algunos zorros de un tono azul traslúcido que brillan en la oscuridad, ¡igual que las nueve colas de Ahri!',
        tipoJuego: 'League of Legends',
        clasificacion: 'Figura de acción',
        altura: 30,
        anchura: 20,
        profundidad: 20,
        size: null,
    },
    {
        nombre: 'Figura Myethos de Ahri florecer espiritual a escala 1/7',
        img: 'src/img/producto6.png',
        precio: 200,
        caracteristica: 'Más comodidad. Mayor personalización. Durabilidad excepcional. Con innovaciones de diseño respaldadas por la investigación y pensadas para un rendimiento sin igual, la Secretlab TITAN Evo es la primera silla gamer de su clase. Mejore su experiencia gaming con una ergonomía de nivel profesional: la elección de los mejores gamers y profesionales de todo el mundo.',
        tipoJuego: 'League of Legends',
        clasificacion: 'Periféricos',
        altura: 160,
        anchura: 100,
        profundidad: 100,
        size: 'M',
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
        imagen: 'src/img/lol.png',
    },
    {
        nombre: 'Free Fire',
        imagen: 'src/img/lol.png',
    },
    {
        nombre: 'League of Legends',
        imagen: 'src/img/lol.png',
    },
    {
        nombre: 'Valorant',
        imagen: 'src/img/lol.png',
    },
    {
        nombre: 'TFT',
        imagen: 'src/img/tft.png',
    },
    {
        nombre: 'hola',
        imagen: 'src/img/tft.png',
    },
    
    // Agrega más juegos aquí si es necesario
];

// Agregar múltiples juegos
nuevosJuegos.forEach((juego) => {
    agregarDocumentoSiNoExiste(JuegoModelo, juego);
});
  
// Exportar modelos si es necesario
export default { JugadorModulo, EquiposModulo, NoticiasModulo, TorneosModulo, TiendaModulo, JuegoModelo};
