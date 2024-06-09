
import ServerMod from "./server.js";
import express, { Router } from "express";
import cors from "cors";
import session from "express-session";
import { createHash } from "crypto";
//Algoritmo Hash seguro de 256 bits
const hashpwd=(pwd)=>{
    //crear hash funcion para contrasña
    return createHash('sha256').update(pwd).digest('hex')
}
const app = express();//crear una instancia de la Express y almacena en la "app"
app.use(cors());//permiten intercambio de los datos entre diferentes dominios
app.use(express.json()); //analizar cuerpo de las solicitudes, lo analizar'a como json 

//api de noticias
app.get('/noticias', async (req, res) => {
      try {
          const noticias = await ServerMod.NoticiasModulo.find({}); // Assuming it returns a cursor like MongoDB
          res.json(noticias);
      } catch (error) {
          console.error('Error de noticias:', error);
          res.status(500).json({ error: 'Servidor error' });
      }
  });
 //api de tienda 
  app.get('/tienda', async (req, res) => {
      try {
          const tienda = await ServerMod.TiendaModulo.find({}); // Assuming it returns a cursor
          res.json(tienda);
      } catch (error) {
          console.error('Error de tienda:', error);
          res.status(500).json({ error: 'Servidor error' });
      }
  });
  
  app.get('/juegos', async (req, res) => {
    try {
        const juegos = await ServerMod.JuegoModelo.find({}); // Assuming it returns a cursor
        res.json(juegos);
    } catch (error) {
        console.error('Error de juegos:', error);
        res.status(500).json({ error: 'Servidor error' });
    }
});
// API para obtener torneos
app.get('/torneos', async (req, res) => {
    try {
        const torneos = await ServerMod.TorneosModulo.find({});
        res.json(torneos);
    } catch (error) {
        console.error('Error obteniendo torneos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// API para unirse a un torneo
app.post('/unirseTorneo', async (req, res) => {
    try {
        const { torneoId, userId } = req.body;
        const torneo = await ServerMod.TorneosModulo.findById(torneoId);
        const user = await ServerMod.JugadorModulo.findById(userId);

        if (!torneo || !user) {
            return res.status(404).send('Torneo o usuario no encontrado');
        }

        if (!torneo.participantes.includes(userId)) {
            torneo.participantes.push(userId);
            await torneo.save();
        }

        res.status(200).send('Unido al torneo con éxito');
    } catch (error) {
        console.error('Error al unirse al torneo:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
// API de tramito del registro
app.post('/registro', async (req, res) => {
    try {
        //conseguir los datos de la cuerpo de petición enviado desde la pageRegistro
        const { nombreUsuario, nombre, apellidos, fechaN, correo, contraseña,img,ptos} = req.body
        //crear nuevo modelo por el de los jugadores
        const nuevoJugador=new ServerMod.JugadorModulo({
            nombreUsuario,
            nombre,
            apellidos,
            fechaN,
            correo,
            contraseña:hashpwd(contraseña),
            img,
            ptos
        })

        await nuevoJugador.save()//guardar los datos a modelo de los jugadores

        res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
        //muestra error
        console.error('Error de registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
//session
app.use(session({
    secret:'12345',//para guardar id de usuario verificado
    resave:false,//guardar cuando id se cambia
    saveUninitialized:false,//seguir el id
    cookie:{ secure:false },//asegurar la seguridad por https
}))
//comprobar usuario que iniciar sesión
  const iniciar= async(req, res)=>{
    try {
        const {nombreIS,contraseñaIS}=req.body
        //encontrar el usuario en modelo de jugador
        const confirmar = await ServerMod.JugadorModulo.findOne({
            nombreUsuario:nombreIS,
            contraseña:hashpwd(contraseñaIS),
        })
        
        console.log(confirmar);
        if (confirmar) {
            console.log(confirmar);
            const equipo=await ServerMod.EquiposModulo.find({
                jugador:{$in:[nombreIS]},
            })
            //estabelecer el ID del usuario en la sesion
            req.session.userObj=confirmar
            req.session.equipoObj=equipo
            res.status(200).send({user:req.session.userObj,equipo:req.session.equipoObj});
        }else{
            console.log(confirmar);
            res.status(401).send({ error: '401 la petición (request) no ha sido ejecutada'});
        }
    } catch (error) {
        res.json({error:'Error del servidor'})
    }
  }
  //actualizar los ptos de usuarios
  const actualizarPtos= async(req,res)=>{
    try {
        //conseguir cuerpo de peticiones
        const {id,ptos}=req.body
        //actualizar objetivo correspondiente por id
        const actualiza= await ServerMod.JugadorModulo.findByIdAndUpdate(
            id,
            {ptos: ptos},
            {new :true}
        );
        if (actualiza) {
            console.log(actualiza);
            //devolver los actualizados a front-end
            res.status(200).send(actualiza)
        }else{
            console.log(actualiza);
            res.status(401).send({ error: 'actualizar fallado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
  }
  //construye route para que no crea api repetidamente
  app.route('/')
    .post(iniciar)
    .put(actualizarPtos)
  //api para modificar los datos de usuarios
  app.put('/modifica',async(req,res)=>{
    try {
        //conseguir el cuerpo de petición
        const{id,email,user,pwd}=req.body;
        //actualizar los datos de usuarios
        const actualiza=await ServerMod.JugadorModulo.findByIdAndUpdate(
            id,
            {
                correo:email,
                nombreUsuario:user,
                contraseña:hashpwd(pwd),
            },
            {new:true},
        )
        console.log(actualiza);
        if (actualiza) {

            res.status(200).send(actualiza)
        }else{
            res.status(401).send("actualizar fallado")
        }
    } catch (error) {
        res.status(500).send('error de servidor')
    }
  })
  //si no tiene equipos
  //funciones
  const conseguirEquipos= async(req,res)=>{
    try {
        const equipos=await ServerMod.EquiposModulo.find({});
        res.status(200).json(equipos) 
    } catch (error) {
        res.status(500).json(console.error(error));
    }
  }
  //actualizar equipos elegidos
  const actualizarEquipos =async(req,res)=>{
    //conseguir valores desde react
    const { userId, equipos } = req.body;
    try {
        // confirma usuario
        const user = await ServerMod.JugadorModulo.findById(userId);
        if (!user) {
            return res.status(401).send('User not found');
        }
        // traversar los elementos de el array equipos y encuentra los equipos elegidos
        for (const equipo of equipos) {
            const equipoActualizar = await ServerMod.EquiposModulo.findOne({ equipo: equipo.equipo });
            if (equipoActualizar) {
                // si usuario no está en el equipo, va a agregar este usuario
                if (!equipoActualizar.jugador.includes(user.nombreUsuario)) {
                    equipoActualizar.jugador.push(user.nombreUsuario);
                    await equipoActualizar.save();
                }
            }
        }

        res.status(200).send('Equipos updated successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
  }
  //route
  app.route("/sinEquipos")
  .get(conseguirEquipos)
  .put(actualizarEquipos)
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;//configurar el n'umero de puerto. Intenta obtener el número puerto. Si no, se utilizará el puerto 3001
app.listen(PORT, () => console.log(`Ya está realizando en el puerto de servidor ${PORT}`));//comprobar que servidor si está ejecutando bien.