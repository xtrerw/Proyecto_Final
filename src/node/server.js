import mongoose from 'mongoose';

const user = encodeURIComponent("root");//usuario de mangoDB Altas
const password = encodeURIComponent("root");//contraseña del usuario
const nombreBD = "OnlyGG";//nombre de base de datos
const url = `mongodb+srv://${user}:${password}@cluster0.3emmgzn.mongodb.net/${nombreBD}`;
//link de conexión a servidor

//crea una conexión
mongoose.connect(url)
    .then(() => {
        console.log("Conexión con éxito y mantenga conectado");
    })
    .catch(err => {
        console.error("Conexión con false", err);
    });
// crear las colecciones y definir documentos
var schema=mongoose.Schema;
var jugadoresSchema=new schema({
    nombre:String,
    apellidos:String,
    año:Number,
    nacionalidad:String
});//definir los documentos de jugadores
var JugadorModulo=mongoose.model("jugadores", jugadoresSchema);//crear la colección Jugadores
//crear los documentos de jugadores
const docJugador=[
    {nombre:"Gabriel",apellidos:"Rodriguez",año:23,nacionalidad:"esp"},
    {nombre:"Santiago",apellidos:"Daza",año:19,nacionalidad:"uk"},
    {nombre:"Wei",apellidos:"Xu",año:20,nacionalidad:"cn"},
    {nombre:"Sherik",apellidos:"Nancy Jr",año:19,nacionalidad:"ger"},
    {nombre:"Franch",apellidos:"Fries",año:20,nacionalidad:"fr"},
    {nombre:"Makoto",apellidos:"Itou",año:18,nacionalidad:"jp"},
    {nombre:"Min-soo",apellidos:"Lee",año:22,nacionalidad:"kor"},
    {nombre:"José",apellidos:"Luis",año:24,nacionalidad:"it"},
    {nombre:"Leon",apellidos:"Esther",año:16,nacionalidad:"ven"},
    {nombre:"Mundo",apellidos:"Saionji",año:16,nacionalidad:"jp"},

]
//insertar los documentos a jugadores
JugadorModulo.create(docJugador)
.then(resulta=>{console.log('jugadores',resulta);})
.catch(err=>{console.log('err',err);});

//EQUIPOS
// definir los documentos de equipos
var equiposSchemas =new schema({
    equipo:String,
    jugador:[String],//debido a un equipo que tiene muchos jugadores
    tipoJuego:String
});
// crear la colección del equipo
var EquiposModulo= mongoose.model("equipos",equiposSchemas);
//crear los documentos de jugadores
const docEquipos=[
    {equipo:"Dragonslayer Legion",jugador:[
        docJugador[0].nombre,
        docJugador[2].nombre,
        docJugador[1].nombre,
        docJugador[3].nombre,
        docJugador[4].nombre
    ],tipoJuego:"League of Legends"},
    {equipo:"Rogue Synapse",jugador:[
        docJugador[5].nombre,
        docJugador[6].nombre, 
        docJugador[8].nombre,
        docJugador[9].nombre,
        docJugador[7].nombre
    ],tipoJuego:"League of Legends"},
    {equipo:"Neon Ninja",jugador:[
        docJugador[5].nombre,
        docJugador[6].nombre, 
        docJugador[8].nombre,
    ],tipoJuego:"TFT"},
    {equipo:"Neko Neko",jugador:[
        docJugador[1].nombre,
        docJugador[2].nombre, 
        docJugador[4].nombre,
    ],tipoJuego:"TFT"},
    {equipo:"SGA",jugador:[
        docJugador[1].nombre,
        docJugador[2].nombre, 
        docJugador[5].nombre,
        docJugador[6].nombre,
        docJugador[7].nombre,
    ],tipoJuego:"Varolent"},
];
//inserta los datos
EquiposModulo.create(docEquipos).then(resulta=>{console.log("equipos",resulta);}).catch(err=>{console.log('err',err);});

//TORNEOS
// definir los documentos de torneos
var torneosSchemas =new schema({
    equipos:[String],//debido a un equipo que tiene 2 o más equipos
    tipoJuego:String,
    fecha:String,
    tipoTorneo:String
});
// crear la colección del torneos
var TorneosModulo= mongoose.model("torneos",torneosSchemas);
//crear los documentos de tornero
const docTorneo=[
    {equipos:[
        docEquipos[0].equipo,
        docEquipos[1].equipo,
    ],tipoJuego:"League of Legends",fecha:"2024-5-1",tipoTorneo:"playoffs"},
    {equipos:[
        docEquipos[2].equipo,
        docEquipos[3].equipo, 
    ],tipoJuego:"TFT",fecha:"2024-5-3",tipoTorneo:"playoffs"}
];
//inserta los datos
TorneosModulo.create(docTorneo).then(resulta=>{console.log("torneos",resulta);}).catch(err=>{console.log('error',err);});


//NOTICIAS
//definir los documentos del NOTICIAS
var noticiasSchemas =new schema({
    img:String,
    titulo:String,
    contenido:String,
    tipoJuego:String,
    fecha:String,
});
// crear la colección del torneos
var NoticiasModulo= mongoose.model("noticias",noticiasSchemas);
//arrglo de imagens de noticias""
var imgNoticias=["src/img/noticias1.png","src/img/noticias2.png","src/img/noticias3.png","src/img/noticias4.png","src/img/noticias5.png"];
//crear los documentos de jugadores
const docNoticias=[
    {img:imgNoticias[0],
    titulo: "Equipo Thunderstrike gana el campeonato de League of Legends",
    contenido: "En un emocionante giro de eventos, el equipo Thunderstrike se coronó campeón del mundo tras derrotar al equipo rival en una serie de partidos que mantuvieron a los fans al borde de sus asientos. El jugador MVP, 'ShadowMaster', logró una jugada decisiva que aseguró la victoria.",
    tipoJuego: "League of Legends",
    fecha: "2024-04-25"
    },
    {
    img: imgNoticias[1], 
    titulo: "Nueva actualización de Counter-Strike revoluciona la estrategia de juego",
    contenido: "Valve ha lanzado una nueva actualización para Counter-Strike: Global Offensive, que introduce cambios significativos en el mapa Dust II, ajustes en las armas y mejoras en la mecánica del juego, prometiendo una renovada experiencia competitiva.",
    tipoJuego: "Counter-Strike: Global Offensive",
    fecha: "2024-03-15"
    },
    {
        img: imgNoticias[2],
        titulo: "Masters de Valorant: Final emocionante en Río de Janeiro",
        contenido: "Con el apoyo entusiasta de los espectadores, la final del Masters de Valorant concluyó en Río de Janeiro. Los equipos de élite se enfrentaron en una batalla intensa, demostrando estrategias y habilidades de alto nivel. Esta actualización introduce un nuevo mapa y contenido exclusivo para la temporada, mejorando la experiencia de juego y ajustando el equilibrio del sistema de armas.",
        tipoJuego: "Valorant",
        fecha: "2024-05-20"
    },
    {
        img: imgNoticias[4],
        titulo: "Overwatch introduce un nuevo héroe que promete cambiar el meta actual",
        contenido: "Blizzard Entertainment ha anunciado la llegada de 'Echo', un nuevo héroe para su popular juego Overwatch. Con habilidades que permiten una gran movilidad y versatilidad en combate, Echo está destinado a tener un impacto significativo en la composición de los equipos y las estrategias de juego.",
        tipoJuego: "Overwatch",
        fecha: "2024-05-18"
    },
    {
        img: imgNoticias[3],
        titulo: "FIFA eWorld Cup ve un nuevo campeón: 'GoalMaster'",
        contenido: "'GoalMaster', el joven prodigio español, se alzó con el trofeo en la última FIFA eWorld Cup, demostrando habilidades excepcionales y una estrategia impecable que dejaron a sus oponentes sin respuestas.",
        tipoJuego: "FIFA",
        fecha: "2024-07-22"
    },
];
//inserta los datos
NoticiasModulo.create(docNoticias).then(resulta=>{console.log("noticias",resulta);}).catch(err=>{console.log('error',err);});

// Juegos


export default {JugadorModulo,EquiposModulo,NoticiasModulo,TorneosModulo};