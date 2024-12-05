// Importa mongoose y otras dependencias necesarias
import mongoose from 'mongoose';
import { createHash } from "crypto";
import { Buffer } from 'safe-buffer'; 

// Conexión a la base de datos MongoDB Atlas
const user = encodeURIComponent("root"); // Usuario de MongoDB Atlas
const password = encodeURIComponent("root"); // Contraseña del usuario
const nombreBD = "OnlyGG"; // Nombre de la base de datos
const url= `mongodb+srv://root:root@cluster0.ympghld.mongodb.net/${nombreBD}?retryWrites=true&w=majority&appName=Cluster0`;// para Daza
const url2= `mongodb+srv://root:root@cluster0.3emmgzn.mongodb.net/${nombreBD}?retryWrites=true&w=majority&appName=Cluster0`;// para Wei

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
  nombreUsuario: String,
  dir: String,
  correo: String,
  contraseña: String,
  ptos: Number,
  img: String,
  carrito: [],
  equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' }, // Nueva referencia al equipo
});

const JugadorModulo = mongoose.model("jugadores", jugadoresSchema);

// Esquema de Equipos
const equiposSchema = new mongoose.Schema({
    equipo: String, // Nombre del equipo
    jugador: [String], // Jugadores del equipo
    tipoJuego: { type: mongoose.Schema.Types.ObjectId, ref: 'Juego' }, // Referencia a la colección de Juegos
    img: String, // Imagen del equipo
  });
  
  const EquiposModulo = mongoose.model('Equipo', equiposSchema);


// Torneos
// Definición del esquema de Torneo con relación a Equipos y Puntos
// Esquema de Torneo
const torneoSchema = new mongoose.Schema({
    tipoTorneo: String,
    fecha: Date,
    tipojuego: { type: mongoose.Schema.Types.ObjectId, ref: 'Juego' }, // Referencia al juego
    equipos: [
        {
            equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' },
            puntos: { type: Number, default: 0 },
        },
    ],
});

const TorneosModulo = mongoose.model("Torneo", torneoSchema);


// Noticias
const noticiasSchemas = new mongoose.Schema({
    img: String,
    titulo: String,
    contenido: [String],
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
    imgBg: String,
});
const TiendaModulo = mongoose.model('tienda', tiendaSchemas);

// Juegos
const juegoSchema = new mongoose.Schema({
    nombre: String,
    imagen: String,
});
const JuegoModelo = mongoose.model('Juego', juegoSchema);

// Administrator
const adminSchema = new mongoose.Schema({
    usuario: String,
    password: String,
});
const AdminModelo = mongoose.model('Administrador', adminSchema);
// Ejemplo de uso para todas las colecciones

// Array de documentos a agregar para Jugadores
//Algoritmo Hash seguro de 256 bits
const hashpwd=(pwd)=>{
    //crear hash funcion para contrasña
    return createHash('sha256').update(pwd).digest('hex')
}
//ejemplo de contraseña
//tipo de juegos
//si quieres añadir mas cosas la añades al array wei

const nuevosAdmin=[
    {
        usuario:"root",
        password:hashpwd("root"),
    },
    {
        usuario: "dazz",
        imagen: "dazz",
    }
];
nuevosAdmin.forEach((admin)=>{
    agregarDocumentoSiNoExiste(AdminModelo, admin)
})

const nuevosJuegos = [
    {
        nombre: 'Dota 2',
        imagen: 'src/img/dota.png',
    },
    {
        nombre: 'Free Fire',
        imagen: 'src/img/ff.png',
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


const nuevosJugadores = [
    {
        nombreUsuario: 'NoobGG',
        dir:"CALLE XXXXX",
        correo: 'noob@gmail.es',
        contraseña: hashpwd('12345'),
        img:'src/img/jugador1.png',
        ptos:300
    },
    {
        nombreUsuario: 'ProGamer21',
        dir:"CALLE XXXXX",
        correo: 'javier@gmail.es',
        contraseña: hashpwd('12345'),
        img:'src/img/jugador2.png',
        ptos:500
    },
    {
        nombreUsuario: '23333',
        dir:"CALLE XXXXX",
        correo: 'maria@gmail.es',
        contraseña: hashpwd('12345'),
        img:'src/img/jugador3.png',
        ptos:800,
    },
    {
        nombreUsuario: 'ChiefNoob',
        dir:"CALLE XXXXX",
        correo: 'juan@gmail.es',
        contraseña: hashpwd('12345'),
        img:'src/img/jugador4.png',
        ptos:800,
    },
    {
        nombreUsuario: 'nooblol',
        dir:"CALLE XXXXX",
        correo: 'kat@gmail.es',
        contraseña: hashpwd('12345'),
        img:'src/img/jugador5.png',
        ptos:1000,
    },
    {
        nombreUsuario: 'CuteBunny',
        dir:"CALLE XXXXX",
        correo: 'sara@gmail.es',
        contraseña: hashpwd('12345'),
        img:'src/img/jugador6.png',
        ptos:1000,
    },
    {
        nombreUsuario: 'SpeedyGonzales',
        dir:"CALLE XXXXX",
        correo: 'carlos@gmail.es',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 600
    },
    {
        nombreUsuario: 'SilentKiller',
        dir:"CALLE XXXXX",
        correo: 'ana@gmail.es',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 750
    },
    {
        nombreUsuario: 'MasterMind',
        dir:"CALLE XXXXX",
        correo: 'fernando@gmail.es',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 850
    },
    {
        nombreUsuario: 'HappyFeet',
        dir:"CALLE XXXXX",
        correo: 'gloria@gmail.es',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 920
    },
    {
        nombreUsuario: 'TechGuru',
        dir:"CALLE XXXXX",
        correo: 'miguel@gmail.es',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 700
    },
    {
        nombreUsuario: 'GamingQueen',
        dir:"CALLE XXXXX",
        correo: 'sophia@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 450
    },
    {
        nombreUsuario: 'CyberWarrior',
        dir:"CALLE XXXXX",
        correo: 'james@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 520
    },
    {
        nombreUsuario: 'PixelMaster',
        dir:"CALLE XXXXX",
        correo: 'emma@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 670
    },
    {
        nombreUsuario: 'DragonSlayer',
        dir:"CALLE XXXXX",
        correo: 'liam@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 720
    },
    {
        nombreUsuario: 'MagicWand',
        dir:"CALLE XXXXX",
        correo: 'olivia@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 580
    },
    {
        nombreUsuario: 'StormBringer',
        dir:"CALLE XXXXX",
        correo: 'noah@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 640
    },
    {
        nombreUsuario: 'CyberPunk',
        dir:"CALLE XXXXX",
        correo: 'isabella@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 710
    },
    {
        nombreUsuario: 'NeoNinja',
        dir:"CALLE XXXXX",
        correo: 'ethan@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 530
    },
    {
        nombreUsuario: 'StarGazer',
        dir:"CALLE XXXXX",
        correo: 'ava@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 680
    },
    {
        nombreUsuario: 'QuantumLeap',
        dir:"CALLE XXXXX",
        correo: 'alexander@gmail.com',
        contraseña: hashpwd('12345'),
        img: 'src/img/defecto.png',
        ptos: 490
    }
];

nuevosJugadores.forEach((player)=>{
    agregarDocumentoSiNoExiste(JugadorModulo,player)
})

// Agregar múltiples jugadores
const nuevosEquipos = async () => {
    try {
        const juegos = await JuegoModelo.find({}); // 获取所有游戏

        const getJuegoId = (nombre) => {
            const juego = juegos.find(juego => juego.nombre === nombre);
            if (!juego) {
                throw new Error(`Juego with name "${nombre}" not found`);
            }
            return juego._id;
        };

        const equipos = [
            {
                equipo: 'Team Phoenix',
                jugador: [nuevosJugadores[3].nombreUsuario, nuevosJugadores[4].nombreUsuario],
                tipoJuego: getJuegoId('TFT'),
                img: 'src/img/equipo1.png',
            },
            {
                equipo: 'Team Thunder',
                jugador: [nuevosJugadores[0].nombreUsuario, nuevosJugadores[1].nombreUsuario],
                tipoJuego: getJuegoId('TFT'),
                img: 'src/img/equipo2.png',
            },
            {
                equipo: 'Team Eclipse',
                jugador: [nuevosJugadores[2].nombreUsuario, nuevosJugadores[5].nombreUsuario],
                tipoJuego: getJuegoId('TFT'),
                img: 'src/img/equipo3.png',
            },
            {
                equipo: 'Team Titan',
                jugador: [nuevosJugadores[6].nombreUsuario, nuevosJugadores[8].nombreUsuario],
                tipoJuego: getJuegoId('TFT'),
                img: 'src/img/equipo4.png',
            },
            {
                equipo: 'Team Floria',
                jugador: [
                    nuevosJugadores[6].nombreUsuario,
                    nuevosJugadores[8].nombreUsuario,
                    nuevosJugadores[16].nombreUsuario,
                    nuevosJugadores[18].nombreUsuario,
                    nuevosJugadores[19].nombreUsuario
                ],
                tipoJuego: getJuegoId('League of Legends'),
                img: 'src/img/equipo5.png'
            },
            {
                equipo: 'Team Nova',
                jugador: [
                    nuevosJugadores[0].nombreUsuario,
                    nuevosJugadores[2].nombreUsuario,
                    nuevosJugadores[7].nombreUsuario,
                    nuevosJugadores[9].nombreUsuario,
                    nuevosJugadores[10].nombreUsuario
                ],
                tipoJuego: getJuegoId('League of Legends'),
                img: 'src/img/equipo6.png'
            },
            {
                equipo: 'Team Vortex',
                jugador: [
                    nuevosJugadores[4].nombreUsuario,
                    nuevosJugadores[5].nombreUsuario,
                    nuevosJugadores[13].nombreUsuario,
                    nuevosJugadores[15].nombreUsuario,
                    nuevosJugadores[17].nombreUsuario
                ],
                tipoJuego: getJuegoId('League of Legends'),
                img: 'src/img/equipo7.png'
            },
            {
                equipo: 'Team Inferno',
                jugador: [
                    nuevosJugadores[1].nombreUsuario,
                    nuevosJugadores[3].nombreUsuario,
                    nuevosJugadores[11].nombreUsuario,
                    nuevosJugadores[12].nombreUsuario,
                    nuevosJugadores[14].nombreUsuario
                ],
                tipoJuego: getJuegoId('League of Legends'),
                img: 'src/img/equipo8.png'
            },
            {
                equipo: 'Team Valor',
                jugador: [
                    nuevosJugadores[3].nombreUsuario,
                    nuevosJugadores[4].nombreUsuario,
                    nuevosJugadores[7].nombreUsuario,
                    nuevosJugadores[9].nombreUsuario,
                    nuevosJugadores[11].nombreUsuario
                ],
                tipoJuego: getJuegoId('Valorant'),
                img: 'src/img/defecto-team.png'
            },
            {
                equipo: 'Team Vanguard',
                jugador: [
                    nuevosJugadores[0].nombreUsuario,
                    nuevosJugadores[2].nombreUsuario,
                    nuevosJugadores[10].nombreUsuario,
                    nuevosJugadores[12].nombreUsuario,
                    nuevosJugadores[14].nombreUsuario
                ],
                tipoJuego: getJuegoId('Valorant'),
                img: 'src/img/defecto-team.png'
            },
            {
                equipo: 'Team Fury',
                jugador: [
                    nuevosJugadores[2].nombreUsuario,
                    nuevosJugadores[5].nombreUsuario,
                    nuevosJugadores[13].nombreUsuario,
                    nuevosJugadores[15].nombreUsuario,
                    nuevosJugadores[17].nombreUsuario
                ],
                tipoJuego: getJuegoId('Valorant'),
                img: 'src/img/defecto-team.png'
            },
            {
                equipo: 'Team Blaze',
                jugador: [
                    nuevosJugadores[6].nombreUsuario,
                    nuevosJugadores[8].nombreUsuario,
                    nuevosJugadores[16].nombreUsuario,
                    nuevosJugadores[18].nombreUsuario,
                    nuevosJugadores[19].nombreUsuario
                ],
                tipoJuego: getJuegoId('Valorant'),
                img: 'src/img/defecto-team.png'
            }
        ];

        equipos.forEach((equipo) => {
            try {
                agregarDocumentoSiNoExiste(EquiposModulo, equipo);
            } catch (error) {
                console.error(`Error adding team ${equipo.equipo}:`, error);
            }
        });
    } catch (error) {
        console.error("Error creating teams:", error);
    }
};

nuevosEquipos();


// Array de documentos a agregar para Noticias
const nuevasNoticias = [
    {
        img: "src/img/noticias1.png",
        titulo: "Los Dragones de Fuego conquistan a los Guerreros del Trueno en una épica batalla en la LLA",
        contenido: ["En una de las partidas más emocionantes de la temporada, los Dragones de Fuego se enfrentaron a los Guerreros del Trueno en la Liga Latinoamérica de League of Legends (LLA). El encuentro fue una montaña rusa de emociones y estrategias que mantuvo a los aficionados al borde de sus asientos.","Primer Juego: Dominio de los Dragones de Fuego","Desde el comienzo, los Dragones de Fuego demostraron su superioridad táctica. Con una composición centrada en el control del mapa y la presión en las líneas, lograron asegurar la primera sangre y varios objetivos tempranos. El jungla 'Fénix' jugó un papel crucial con Lee Sin, facilitando la expansión de su equipo. A pesar de los esfuerzos defensivos de los Guerreros del Trueno, liderados por 'Rayo' con Gnar, los Dragones cerraron el primer juego en menos de 30 minutos.","Segundo Juego: La Resistencia de los Guerreros del Trueno","El segundo juego fue diferente. Los Guerreros del Trueno ajustaron su estrategia y seleccionaron una composición más defensiva, con 'Tempestad' brillando con Aphelios. A medida que el juego avanzaba, las peleas por equipos se volvieron más intensas. Gracias a las iniciaciones de 'Tormenta' con Rakan, los Guerreros lograron capitalizar en una pelea por el Barón Nashor y empujar hasta la base enemiga, igualando la serie.","Juego Decisivo: Una Batalla Épica","El último juego fue el clímax perfecto. Ambos equipos optaron por composiciones agresivas, lo que resultó en un juego lleno de acción desde el primer minuto. 'Dragón' destacó con su LeBlanc, mientras que 'Trueno' mostró gran habilidad con Kha'Zix. Sin embargo, la coordinación de los Dragones de Fuego prevaleció. Una última pelea en el pozo del Dragón Ancestral decidió el destino del juego, con los Dragones de Fuego asegurando el objetivo y, con él, la victoria final.","Conclusión: Una Serie para Recordar","La serie entre los Dragones de Fuego y los Guerreros del Trueno será recordada como una de las más intensas de la LLA. Ambos equipos demostraron un alto nivel de habilidad y estrategia, pero al final, los Dragones de Fuego se alzaron como los vencedores. Los aficionados ya están ansiosos por ver qué les deparará el futuro a estos talentosos equipos."],
        tipoJuego: "League of Legends",
        fecha: "2024-05-18"
    },
    {
        img: "src/img/noticias2.png",
        titulo: "Relámpago Digital se corona campeón del Torneo Mundial de Rainbow Six Siege",
        contenido: ["En un evento que quedará grabado en la historia de los deportes electrónicos, el equipo Relámpago Digital se coronó campeón del prestigioso Torneo Mundial de Rainbow Six Siege, llevándose a casa el gran premio y consolidándose como uno de los mejores equipos del mundo.","El torneo, celebrado en París, Francia, reunió a los mejores equipos de Rainbow Six Siege de todo el mundo. La competencia fue feroz, pero Relámpago Digital destacó por su increíble coordinación y habilidad táctica. Su camino hacia la victoria incluyó emocionantes enfrentamientos contra los favoritos del torneo, mostrando una resiliencia y determinación impresionantes.","La gran final fue un espectáculo inolvidable. Relámpago Digital se enfrentó a los temidos Titanes del Trueno, en una serie que se extendió hasta el último mapa. Con jugadas maestras y una defensa impenetrable, Relámpago Digital logró asegurar la victoria con un marcador final de 3-2. El MVP del torneo, 'Flash', se destacó con su excepcional desempeño, particularmente en el mapa decisivo donde sus eliminaciones estratégicas fueron clave para asegurar la victoria.","Este triunfo no solo les ha otorgado el premio monetario y el trofeo del campeonato, sino que también ha fortalecido su reputación en la escena global de los deportes electrónicos. Los aficionados y analistas elogian la disciplina y la innovación estratégica del equipo, prediciendo que Relámpago Digital seguirá dominando en futuros torneos.","'Estamos extremadamente orgullosos de este logro', declaró el capitán del equipo, 'Rayo'. 'Hemos trabajado muy duro para llegar aquí y esta victoria es un testimonio de nuestra dedicación y trabajo en equipo.'"],
        tipoJuego: "Rainbow Six",
        fecha: "2024-05-18"
    },
    
    {
        img: "src/img/noticias3.png",
        titulo: "Sorpresa en el Campeonato: Los Titanes de Neón caen ante los Lobos de Sombra en un partido decisivo de Valorant",
        contenido: ["En un giro inesperado de eventos, los Titanes de Neón, considerados uno de los equipos más fuertes de la escena competitiva de Valorant, fueron derrotados por los Lobos de Sombra en un partido crucial del Campeonato Internacional de Valorant. El encuentro, que tuvo lugar anoche, dejó a los aficionados y analistas sorprendidos por el resultado.","El primer mapa, Ascent, comenzó con una ventaja temprana para los Titanes de Neón, gracias a la impresionante precisión de su duelist 'Electro' con Jett. Sin embargo, los Lobos de Sombra rápidamente ajustaron su estrategia y, liderados por su capitán 'Sombra', lograron equilibrar el marcador. La partida se mantuvo reñida hasta los últimos minutos, pero una brillante jugada de 'Sombra' con Omen aseguró el mapa para su equipo con un marcador de 13-11.","En el segundo mapa, Bind, los Lobos de Sombra dominaron desde el principio. 'Fénix', su entry fragger, mostró una actuación excepcional con Phoenix, ganando varias rondas cruciales para su equipo. A pesar de los esfuerzos de los Titanes de Neón por recuperar el control, los Lobos de Sombra mantuvieron su dominio y cerraron el mapa con un contundente 13-7.","La derrota de los Titanes de Neón en este partido los deja en una posición difícil para avanzar en el torneo, mientras que los Lobos de Sombra avanzan con confianza hacia las finales. Esta sorpresa demuestra que en el mundo de los deportes electrónicos, nada está garantizado, y cualquier equipo puede lograr la victoria con la estrategia y la ejecución adecuadas.","'Estamos decepcionados con el resultado, pero aprenderemos de esta experiencia y volveremos más fuertes', comentó 'Electro', el capitán de los Titanes de Neón. Por otro lado, 'Sombra', el capitán de los Lobos de Sombra, expresó su orgullo por el desempeño de su equipo y su entusiasmo por las próximas rondas del campeonato."],
        tipoJuego: "Valorant",
        fecha: "2024-05-18"
    },
    {
        img: "src/img/noticias4.png",
        titulo: "Escándalo en el Torneo Internacional: Los Guardianes de la Tormenta descalificados por hacer trampa en Dota 2",
        contenido: ["En un escándalo que ha sacudido la comunidad de Dota 2, los Guardianes de la Tormenta, uno de los equipos más renombrados del circuito competitivo, han sido descalificados del Torneo Internacional tras ser descubiertos haciendo trampa durante un partido de calificación crucial.","El incidente ocurrió durante las eliminatorias de ayer, cuando se detectaron irregularidades en el comportamiento del equipo durante el partido contra los Dragones de Hielo. La organización del torneo, tras una investigación exhaustiva, confirmó que los Guardianes de la Tormenta utilizaron software no autorizado para obtener una ventaja injusta sobre sus oponentes.","La noticia de la descalificación se anunció oficialmente esta mañana, provocando una ola de reacciones en la comunidad de esports. Los Dragones de Hielo, que fueron perjudicados por las acciones de los Guardianes de la Tormenta, avanzarán automáticamente a la siguiente ronda de la competición.","'Estamos profundamente decepcionados por el comportamiento de los Guardianes de la Tormenta', declaró el organizador del torneo en un comunicado. 'La integridad y la equidad son pilares fundamentales de nuestra competición, y cualquier violación de estas normas será castigada severamente.'","Los Guardianes de la Tormenta han emitido una disculpa pública a través de sus redes sociales, reconociendo su culpa y aceptando la descalificación. 'Lamentamos profundamente nuestras acciones y aceptamos la decisión de los organizadores del torneo. Nos comprometemos a aprender de este error y a mejorar como equipo y como individuos', declaró el capitán del equipo, 'Trueno'.","Este escándalo ha generado un intenso debate sobre la ética y la integridad en los deportes electrónicos, y muchos piden sanciones más severas y medidas preventivas para evitar futuros incidentes. Mientras tanto, los aficionados esperan ansiosos el desarrollo del torneo sin la presencia de los Guardianes de la Tormenta, que ahora deberán enfrentar las consecuencias de sus acciones."],
        tipoJuego: "Dota 2",
        fecha: "2024-05-18"
    },
    {
        img: "src/img/noticias5.png",
        titulo: "Wei y Daza de OnlyGG anuncian la expansión del torneo a escala internacional",
        contenido: ["En una emocionante conferencia de prensa celebrada ayer, Wei y Daza, los carismáticos anfitriones del popular canal de esports OnlyGG, anunciaron la expansión de su torneo anual a una escala internacional. Este ambicioso movimiento promete llevar la competencia a nuevos niveles y atraer a equipos de todo el mundo para participar en uno de los eventos más esperados del año en el mundo de los videojuegos.","'Estamos encantados de anunciar que nuestro próximo torneo tendrá una escala internacional', declaró Wei, visiblemente emocionado. 'Hemos estado trabajando arduamente para hacer realidad este sueño, y finalmente podemos compartir esta noticia con todos nuestros seguidores y la comunidad de esports.'","Daza añadió: 'La respuesta de la comunidad ha sido increíble, y estamos comprometidos a ofrecer la mejor experiencia posible. Este torneo no solo será una competencia de alto nivel, sino también una celebración de la diversidad y el talento de jugadores de todos los rincones del mundo.'","El torneo, que tradicionalmente ha contado con equipos de la región, ahora abrirá sus puertas a participantes internacionales, ofreciendo una plataforma más grande y prestigiosa. Se espera que el evento atraiga a los mejores equipos de juegos como League of Legends, Valorant, Dota 2 y otros títulos populares, aumentando así la competitividad y la emoción.","La expansión del torneo incluye premios más grandes, mejores infraestructuras y una cobertura mediática más amplia, lo que asegura que tanto los jugadores como los espectadores vivan una experiencia inolvidable. Además, se ha confirmado que habrá varias fases clasificatorias en diferentes regiones para garantizar que los mejores equipos tengan la oportunidad de participar.","'Queremos agradecer a todos nuestros seguidores y patrocinadores por su apoyo continuo', concluyó Wei. 'Estamos ansiosos por ver cómo este torneo se convierte en un evento verdaderamente global y esperamos ofrecerles un espectáculo increíble.'","El anuncio ha sido recibido con entusiasmo por la comunidad de esports, y muchos ya están anticipando lo que promete ser uno de los eventos más emocionantes del próximo año. Con Wei y Daza al mando, la expansión de OnlyGG sin duda elevará el estándar de los torneos de esports a nivel mundial."],
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
        caracteristica: 'Más comodidad. Mayor personalización. Durabilidad excepcional.',
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
        apartados:['src/img/top1.png','src/img/top1_p1.png','src/img/top1_p2.png','src/img/top1_p3.png','src/img/top1_p4.png'],
        imgBg:"../src/img/premio1.png",
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
        apartados:['src/img/top2.png','src/img/top2_p1.png','src/img/top2_p2.png','src/img/top2_p3.png'],
        imgBg:"../src/img/premio2.png",
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
        apartados:['src/img/top3.png','src/img/top3_p1.png','src/img/top3_p2.png'],
        imgBg:"../src/img/premio3.png",
    },
    // Agrega más productos aquí si es necesario
];

// Agregar múltiples productos a la tienda
nuevosProductos.forEach((producto) => {
    agregarDocumentoSiNoExiste(TiendaModulo, producto);
});



const crearTorneosPorCadaJuego = async () => {
    try {
        const juegos = await JuegoModelo.find({});
        if (juegos.length === 0) {
            console.log("No hay juegos disponibles para crear torneos.");
            return;
        }

        for (const juego of juegos) {
            const torneoExistente = await TorneosModulo.findOne({ tipoJuego: juego._id });

            if (!torneoExistente) {
                // Buscar equipos asociados a este juego
                const equipos = await EquiposModulo.find({ tipoJuego: juego._id });
                if (equipos.length === 0) {
                    console.log(`No hay equipos disponibles para el juego ${juego.nombre}.`);
                    continue;
                }

                // Crear el nuevo torneo con los equipos asociados
                const nuevoTorneo = {
                    equipos: equipos.map((equipo) => equipo._id), // Usar los IDs de los equipos
                    tipojuego: juego._id, // Referencia al ID del juego
                    fecha: new Date().toISOString().split('T')[0], // Fecha actual
                    tipoTorneo: 'Torneo Estándar', // Tipo de torneo por defecto
                };

                await TorneosModulo.create(nuevoTorneo);
                console.log(`Torneo para el juego ${juego.nombre} creado correctamente.`);
            } else {
                console.log(`Torneo para el juego ${juego.nombre} ya existe.`);
            }
        }
    } catch (error) {
        console.error("Error al crear torneos por cada juego:", error);
    }
};

// Llamar a la función para crear torneos
crearTorneosPorCadaJuego();

const agregarEquipoATorneo = async (torneoId, equipoId) => {
    try {
        const torneo = await TorneosModulo.findById(torneoId);
        if (!torneo) {
            console.error(`Torneo con ID ${torneoId} no encontrado.`);
            return;
        }

        const equipo = await EquiposModulo.findById(equipoId);
        if (!equipo) {
            console.error(`Equipo con ID ${equipoId} no encontrado.`);
            return;
        }

        torneo.equipos.push(equipo._id);
        await torneo.save();
        console.log(`Equipo ${equipo.equipo} agregado correctamente al torneo ${torneoId}.`);
    } catch (error) {
        console.error('Error al agregar equipo al torneo:', error);
    }
};

// Exportar modelos si es necesario

export default { 
    AdminModelo,
    JugadorModulo, 
    EquiposModulo, 
    NoticiasModulo, 
    TorneosModulo,
    TiendaModulo, 
    JuegoModelo,
    agregarDocumentoSiNoExiste,
    agregarEquipoATorneo,
    };
