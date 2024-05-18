// Importa mongoose y otras dependencias necesarias
import mongoose from 'mongoose';

// Conexión a la base de datos MongoDB Atlas
const user = encodeURIComponent("root"); // Usuario de MongoDB Atlas
const password = encodeURIComponent("root"); // Contraseña del usuario
const nombreBD = "OnlyGG"; // Nombre de la base de datos
const url = `mongodb+srv://root:root@cluster0.ympghld.mongodb.net/${nombreBD}?retryWrites=true&w=majority&appName=Cluster0`;// para Daza
const url2= `mongodb+srv://root:root@cluster0.3emmgzn.mongodb.net/${nombreBD}?retryWrites=true&w=majority&appName=Cluster0`;// para Wei

mongoose.connect(url2, {
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
    apartados: [String],
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
        img: "src/img/noticias1.png",
        titulo: "Los Dragones de Fuego conquistan a los Guerreros del Trueno en una épica batalla en la LLA",
        contenido: "En una de las partidas más emocionantes de la temporada, los Dragones de Fuego se enfrentaron a los Guerreros del Trueno en la Liga Latinoamérica de League of Legends (LLA). El encuentro fue una montaña rusa de emociones y estrategias que mantuvo a los aficionados al borde de sus asientos.\n\nPrimer Juego: Dominio de los Dragones de Fuego\nDesde el comienzo, los Dragones de Fuego demostraron su superioridad táctica. Con una composición centrada en el control del mapa y la presión en las líneas, lograron asegurar la primera sangre y varios objetivos tempranos. El jungla 'Fénix' jugó un papel crucial con Lee Sin, facilitando la expansión de su equipo. A pesar de los esfuerzos defensivos de los Guerreros del Trueno, liderados por 'Rayo' con Gnar, los Dragones cerraron el primer juego en menos de 30 minutos.\n\nSegundo Juego: La Resistencia de los Guerreros del Trueno\nEl segundo juego fue diferente. Los Guerreros del Trueno ajustaron su estrategia y seleccionaron una composición más defensiva, con 'Tempestad' brillando con Aphelios. A medida que el juego avanzaba, las peleas por equipos se volvieron más intensas. Gracias a las iniciaciones de 'Tormenta' con Rakan, los Guerreros lograron capitalizar en una pelea por el Barón Nashor y empujar hasta la base enemiga, igualando la serie.\n\nJuego Decisivo: Una Batalla Épica\nEl último juego fue el clímax perfecto. Ambos equipos optaron por composiciones agresivas, lo que resultó en un juego lleno de acción desde el primer minuto. 'Dragón' destacó con su LeBlanc, mientras que 'Trueno' mostró gran habilidad con Kha'Zix. Sin embargo, la coordinación de los Dragones de Fuego prevaleció. Una última pelea en el pozo del Dragón Ancestral decidió el destino del juego, con los Dragones de Fuego asegurando el objetivo y, con él, la victoria final.\n\nConclusión: Una Serie para Recordar\nLa serie entre los Dragones de Fuego y los Guerreros del Trueno será recordada como una de las más intensas de la LLA. Ambos equipos demostraron un alto nivel de habilidad y estrategia, pero al final, los Dragones de Fuego se alzaron como los vencedores. Los aficionados ya están ansiosos por ver qué les deparará el futuro a estos talentosos equipos.",
        tipoJuego: "League of Legends",
        fecha: "2024-05-18"
    },
    {
        img: "src/img/noticias2.png",
        titulo: "Relámpago Digital se corona campeón del Torneo Mundial de Rainbow Six Siege",
        contenido: "En un evento que quedará grabado en la historia de los deportes electrónicos, el equipo Relámpago Digital se coronó campeón del prestigioso Torneo Mundial de Rainbow Six Siege, llevándose a casa el gran premio y consolidándose como uno de los mejores equipos del mundo.\n\nEl torneo, celebrado en París, Francia, reunió a los mejores equipos de Rainbow Six Siege de todo el mundo. La competencia fue feroz, pero Relámpago Digital destacó por su increíble coordinación y habilidad táctica. Su camino hacia la victoria incluyó emocionantes enfrentamientos contra los favoritos del torneo, mostrando una resiliencia y determinación impresionantes.\n\nLa gran final fue un espectáculo inolvidable. Relámpago Digital se enfrentó a los temidos Titanes del Trueno, en una serie que se extendió hasta el último mapa. Con jugadas maestras y una defensa impenetrable, Relámpago Digital logró asegurar la victoria con un marcador final de 3-2. El MVP del torneo, 'Flash', se destacó con su excepcional desempeño, particularmente en el mapa decisivo donde sus eliminaciones estratégicas fueron clave para asegurar la victoria.\n\nEste triunfo no solo les ha otorgado el premio monetario y el trofeo del campeonato, sino que también ha fortalecido su reputación en la escena global de los deportes electrónicos. Los aficionados y analistas elogian la disciplina y la innovación estratégica del equipo, prediciendo que Relámpago Digital seguirá dominando en futuros torneos.\n\n'Estamos extremadamente orgullosos de este logro', declaró el capitán del equipo, 'Rayo'. 'Hemos trabajado muy duro para llegar aquí y esta victoria es un testimonio de nuestra dedicación y trabajo en equipo.'",
        tipoJuego: "Rainbow Six",
        fecha: "2024-05-18"
    },
    {
        img: "src/img/noticias3.png",
        titulo: "Sorpresa en el Campeonato: Los Titanes de Neón caen ante los Lobos de Sombra en un partido decisivo de Valorant",
        contenido: "En un giro inesperado de eventos, los Titanes de Neón, considerados uno de los equipos más fuertes de la escena competitiva de Valorant, fueron derrotados por los Lobos de Sombra en un partido crucial del Campeonato Internacional de Valorant. El encuentro, que tuvo lugar anoche, dejó a los aficionados y analistas sorprendidos por el resultado.\n\nEl primer mapa, Ascent, comenzó con una ventaja temprana para los Titanes de Neón, gracias a la impresionante precisión de su duelist 'Electro' con Jett. Sin embargo, los Lobos de Sombra rápidamente ajustaron su estrategia y, liderados por su capitán 'Sombra', lograron equilibrar el marcador. La partida se mantuvo reñida hasta los últimos minutos, pero una brillante jugada de 'Sombra' con Omen aseguró el mapa para su equipo con un marcador de 13-11.\n\nEn el segundo mapa, Bind, los Lobos de Sombra dominaron desde el principio. 'Fénix', su entry fragger, mostró una actuación excepcional con Phoenix, ganando varias rondas cruciales para su equipo. A pesar de los esfuerzos de los Titanes de Neón por recuperar el control, los Lobos de Sombra mantuvieron su dominio y cerraron el mapa con un contundente 13-7.\n\nLa derrota de los Titanes de Neón en este partido los deja en una posición difícil para avanzar en el torneo, mientras que los Lobos de Sombra avanzan con confianza hacia las finales. Esta sorpresa demuestra que en el mundo de los deportes electrónicos, nada está garantizado, y cualquier equipo puede lograr la victoria con la estrategia y la ejecución adecuadas.\n\n'Estamos decepcionados con el resultado, pero aprenderemos de esta experiencia y volveremos más fuertes', comentó 'Electro', el capitán de los Titanes de Neón. Por otro lado, 'Sombra', el capitán de los Lobos de Sombra, expresó su orgullo por el desempeño de su equipo y su entusiasmo por las próximas rondas del campeonato.",
        tipoJuego: "Valorant",
        fecha: "2024-05-18"
    },
    {
        img: "src/img/noticias4.png",
        titulo: "Escándalo en el Torneo Internacional: Los Guardianes de la Tormenta descalificados por hacer trampa en Dota 2",
        contenido: "En un escándalo que ha sacudido la comunidad de Dota 2, los Guardianes de la Tormenta, uno de los equipos más renombrados del circuito competitivo, han sido descalificados del Torneo Internacional tras ser descubiertos haciendo trampa durante un partido de calificación crucial.\n\nEl incidente ocurrió durante las eliminatorias de ayer, cuando se detectaron irregularidades en el comportamiento del equipo durante el partido contra los Dragones de Hielo. La organización del torneo, tras una investigación exhaustiva, confirmó que los Guardianes de la Tormenta utilizaron software no autorizado para obtener una ventaja injusta sobre sus oponentes.\n\nLa noticia de la descalificación se anunció oficialmente esta mañana, provocando una ola de reacciones en la comunidad de esports. Los Dragones de Hielo, que fueron perjudicados por las acciones de los Guardianes de la Tormenta, avanzarán automáticamente a la siguiente ronda de la competición.\n\n'Estamos profundamente decepcionados por el comportamiento de los Guardianes de la Tormenta', declaró el organizador del torneo en un comunicado. 'La integridad y la equidad son pilares fundamentales de nuestra competición, y cualquier violación de estas normas será castigada severamente.'\n\nLos Guardianes de la Tormenta han emitido una disculpa pública a través de sus redes sociales, reconociendo su culpa y aceptando la descalificación. 'Lamentamos profundamente nuestras acciones y aceptamos la decisión de los organizadores del torneo. Nos comprometemos a aprender de este error y a mejorar como equipo y como individuos', declaró el capitán del equipo, 'Trueno'.\n\nEste escándalo ha generado un intenso debate sobre la ética y la integridad en los deportes electrónicos, y muchos piden sanciones más severas y medidas preventivas para evitar futuros incidentes. Mientras tanto, los aficionados esperan ansiosos el desarrollo del torneo sin la presencia de los Guardianes de la Tormenta, que ahora deberán enfrentar las consecuencias de sus acciones.",
        tipoJuego: "Dota 2",
        fecha: "2024-05-18"
    },
    {
        img: "src/img/noticias5.png",
        titulo: "Wei y Daza de OnlyGG anuncian la expansión del torneo a escala internacional",
        contenido: "En una emocionante conferencia de prensa celebrada ayer, Wei y Daza, los carismáticos anfitriones del popular canal de esports OnlyGG, anunciaron la expansión de su torneo anual a una escala internacional. Este ambicioso movimiento promete llevar la competencia a nuevos niveles y atraer a equipos de todo el mundo para participar en uno de los eventos más esperados del año en el mundo de los videojuegos.\n\n'Estamos encantados de anunciar que nuestro próximo torneo tendrá una escala internacional', declaró Wei, visiblemente emocionado. 'Hemos estado trabajando arduamente para hacer realidad este sueño, y finalmente podemos compartir esta noticia con todos nuestros seguidores y la comunidad de esports.'\n\nDaza añadió: 'La respuesta de la comunidad ha sido increíble, y estamos comprometidos a ofrecer la mejor experiencia posible. Este torneo no solo será una competencia de alto nivel, sino también una celebración de la diversidad y el talento de jugadores de todos los rincones del mundo.'\n\nEl torneo, que tradicionalmente ha contado con equipos de la región, ahora abrirá sus puertas a participantes internacionales, ofreciendo una plataforma más grande y prestigiosa. Se espera que el evento atraiga a los mejores equipos de juegos como League of Legends, Valorant, Dota 2 y otros títulos populares, aumentando así la competitividad y la emoción.\n\nLa expansión del torneo incluye premios más grandes, mejores infraestructuras y una cobertura mediática más amplia, lo que asegura que tanto los jugadores como los espectadores vivan una experiencia inolvidable. Además, se ha confirmado que habrá varias fases clasificatorias en diferentes regiones para garantizar que los mejores equipos tengan la oportunidad de participar.\n\n'Queremos agradecer a todos nuestros seguidores y patrocinadores por su apoyo continuo', concluyó Wei. 'Estamos ansiosos por ver cómo este torneo se convierte en un evento verdaderamente global y esperamos ofrecerles un espectáculo increíble.'\n\nEl anuncio ha sido recibido con entusiasmo por la comunidad de esports, y muchos ya están anticipando lo que promete ser uno de los eventos más emocionantes del próximo año. Con Wei y Daza al mando, la expansión de OnlyGG sin duda elevará el estándar de los torneos de esports a nivel mundial.",
        tipoJuego: "General",
        fecha: "2024-05-18"
    }
    
    
    
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
        apartados:['src/img/producto1.png','src/img/producto1_p1.png','src/img/producto1_p2.png','src/img/producto1_p3.png','src/img/producto1_p4.png'],
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
        apartados:['src/img/producto2.png','src/img/producto2_p1.png','src/img/producto2_p2.png','src/img/producto2_p3.png'],
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
        apartados:['src/img/producto3.png','src/img/producto3_p1.png','src/img/producto3_p2.png','src/img/producto3_p3.png','src/img/producto3_p4.png'],
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
        apartados:['src/img/producto4.png','src/img/producto4_p1.png','src/img/producto4_p2.png','src/img/producto4_p3.png','src/img/producto4_p4.png'],
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
        apartados:['src/img/producto5.png','src/img/producto5_p1.png','src/img/producto5_p2.png','src/img/producto5_p3.png','src/img/producto5_p4.png'],
    },
    {
        nombre: 'Secretlab TITAN Evo',
        img: 'src/img/producto6.png',
        precio: 200,
        caracteristica: 'Más comodidad. Mayor personalización. Durabilidad excepcional. Con innovaciones de diseño respaldadas por la investigación y pensadas para un rendimiento sin igual, la Secretlab TITAN Evo es la primera silla gamer de su clase. Mejore su experiencia gaming con una ergonomía de nivel profesional: la elección de los mejores gamers y profesionales de todo el mundo.',
        tipoJuego: 'League of Legends',
        clasificacion: 'Periféricos',
        altura: 160,
        anchura: 100,
        profundidad: 100,
        size: 'M',
        apartados:['src/img/producto6.png','src/img/producto6_p1.png','src/img/producto6_p2.png','src/img/producto6_p3.png','src/img/producto6_p4.png'],
    },
    {
        nombre: 'Figura de Kindred florecer espiritual',
        img: 'src/img/top1.png',
        precio: 300,
        caracteristica: 'Dos cabezas para Cordera (con y sin máscara).',
        tipoJuego: 'League of Legends',
        clasificacion: 'Figura de acción',
        altura: 37,
        anchura: 28,
        profundidad: 28,
        size: null,
        apartados:['src/img/top1.png','src/img/top1_p1.png','src/img/top1_p2.png','src/img/top1_p3.png','src/img/top1_p4.png']
    },
    {
        nombre: 'Dim Mak x Teamfight Tactics - Camiseta de B Llota',
        img: 'src/img/top2.png',
        precio: 250,
        caracteristica: 'Hecha en un 100 % de algodón. Lavar en frío en lavadora y secar colgada o extendida. No lavar en seco. Serigrafiado en Los Ángeles con amor.',
        tipoJuego: 'Teamfight Tactics ',
        clasificacion: 'Ropa',
        altura: null,
        anchura: null,
        profundidad: null,
        size: 'M',
        apartados:['src/img/top2.png','src/img/top2_p1.png','src/img/top2_p2.png','src/img/top2_p3.png']
    },
    {
        nombre: 'PcCom Custom',
        img: 'src/img/top3.png',
        precio: 400,
        caracteristica: 'AMD Ryzen 7 7800X3D / 64GB / 2TB SSD / RTX 4080 Super 16GB + Windows 11 Home',
        tipoJuego: 'valorant',
        clasificacion: 'Periféricos',
        altura: 50,
        anchura: 40,
        profundidad: 100,
        size: 'M',
        apartados:['src/img/top3.png','src/img/top3_p1.png','src/img/top3_p2.png']
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
        imagen: 'src/img/dota.png',
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
        imagen: 'src/img/valorant.png',
    },
    {
        nombre: 'TFT',
        imagen: 'src/img/tft.png',
    },
    {
        nombre: 'Rainbow Six',
        imagen: 'src/img/rainbow.png',
    },
    
    // Agrega más juegos aquí si es necesario
];

// Agregar múltiples juegos
nuevosJuegos.forEach((juego) => {
    agregarDocumentoSiNoExiste(JuegoModelo, juego);
});
  
// Exportar modelos si es necesario
export default { JugadorModulo, EquiposModulo, NoticiasModulo, TorneosModulo, TiendaModulo, JuegoModelo};
