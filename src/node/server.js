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
                console.log(`Nuevo documento agregado correctamente a la colección ${Modelo.modelName}.`);
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

agregarDocumentoSiNoExiste(JugadorModulo, {
    nombre: 'Nuevo Jugador',
    apellidos: 'Apellido Nuevo',
    año: 25,
    nacionalidad: 'Nueva Nacionalidad',
});

agregarDocumentoSiNoExiste(EquiposModulo, {
    equipo: 'Nuevo Equipo',
    jugador: ['Jugador 1', 'Jugador 2'],
    tipoJuego: 'Nuevo Tipo de Juego',
});

agregarDocumentoSiNoExiste(NoticiasModulo, {
    img: 'ruta/de/imagen/para/nueva-noticia.jpg',
    titulo: 'Nueva Noticia',
    contenido: 'Contenido de la nueva noticia.',
    tipoJuego: 'Nuevo Tipo de Juego',
    fecha: '2024-05-12',
});

agregarDocumentoSiNoExiste(TorneosModulo, {
    equipos: ['Equipo 1', 'Equipo 2'],
    tipoJuego: 'Nuevo Tipo de Juego',
    fecha: '2024-05-12',
    tipoTorneo: 'Nuevo Tipo de Torneo',
});

agregarDocumentoSiNoExiste(TiendaModulo, {
    nombre: 'Nuevo Producto',
    img: 'ruta/de/imagen/para/nuevo-producto.jpg',
    precio: 50,
    caracteristica: 'Nueva Característica',
    tipoJuego: 'Nuevo Tipo de Juego',
    clasificacion: 'Nueva Clasificación',
    altura: 10,
    anchura: 20,
    profundidad: 5,
    size: 'M',
});

// Agregar un nuevo juego
agregarDocumentoSiNoExiste(JuegoModelo, {
    nombre: 'Nuevo Juego',
    imagen: 'ruta/de/imagen/para/nuevo-juego.jpg',
});

// Exportar modelos si es necesario
export { Jugador, Equipo, Torneo, Noticia, Tienda, Juego };
