
import ServerMod from "./server.js";
import express, { Router } from "express";
import cors from "cors";
import session from "express-session";
import { createHash } from "crypto";
import models from './server.js';
import mongoose from 'mongoose';

const { TorneosModulo } = models;
const { EquiposModulo } = models;
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
app.get('/juegos/:juegoId', async (req, res) => {
    const { juegoId } = req.params;  // Captura el juegoId desde la URL
    try {
        // Buscar el juego por su ID
        const juego = await ServerMod.JuegoModelo.findById(juegoId);

        if (!juego) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }

        res.json(juego);  // Responde con el juego encontrado
    } catch (error) {
        console.error('Error al obtener el juego:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener el juego' });
    }
});

// Ruta para obtener los torneos de un juego específico
// Ruta para obtener los torneos de un juego específico
app.get('/torneos/:juegoId', async (req, res) => {
    const { juegoId } = req.params;
    console.log("ID del juego recibido:", juegoId);

    try {
        // Verificar si el juegoId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(juegoId)) {
            return res.status(400).json({ error: 'ID de juego inválido' });
        }

        // Convertir el juegoId a ObjectId
        const objectId = new mongoose.Types.ObjectId(juegoId);

        // Buscar los torneos cuyo tipoJuego coincide con juegoId
        const torneos = await TorneosModulo.find({ tipojuego: objectId })  // Aquí se usa 'tipojuego'
            .populate('tipojuego', 'nombre');  // Aquí también se usa 'tipojuego'

        console.log('Torneos encontrados:', torneos); // Verifica los torneos encontrados

        if (!torneos || torneos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron torneos para este juego' });
        }

        res.json(torneos);
    } catch (error) {
        console.error('Error al obtener los torneos:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener torneos' });
    }
});


app.post('/crearTorneo', async (req, res) => {
    try {
        console.log('Datos recibidos en el backend:', req.body); // Log para ver los datos recibidos

        const { tipoTorneo, tipoJuego, fecha } = req.body;

        // Verificar que los campos no estén vacíos
        if (!tipoTorneo || !tipoJuego || !fecha) {
            return res.status(400).json({ error: 'Faltan campos necesarios' });
        }

        // Convertir la fecha de cadena a objeto Date
        const fechaConvertida = new Date(fecha); // Convierte la fecha de string a Date
        
        // Verificar si la fecha es válida
        if (isNaN(fechaConvertida)) {
            return res.status(400).json({ error: 'Fecha inválida' });
        }

        console.log('Fecha convertida:', fechaConvertida); // Verificar si la conversión fue exitosa

        // Buscar el ObjectId del juego basado en el nombre (tipoJuego)
        const juego = await ServerMod.JuegoModelo.findOne({ nombre: tipoJuego });
        
        if (!juego) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }

        const nuevoTorneo = new ServerMod.TorneosModulo({
            tipoTorneo,
            tipoJuego: juego._id, // Asignar el ObjectId del juego encontrado
            fecha: fechaConvertida, // Usa el objeto Date
        });

        await nuevoTorneo.save();
        res.status(201).json(nuevoTorneo); // Responde con el torneo creado
    } catch (error) {
        console.error('Error al crear el torneo:', error);
        res.status(500).json({ error: 'Error al crear el torneo' });
    }
});


// Ruta para actualizar los puntos de un equipo en un torneo
app.put('/torneo/:torneoId/equipos/:equipoId/puntos', async (req, res) => {
    const { torneoId, equipoId } = req.params;
    const { puntos } = req.body;
  
    try {
      const torneo = await TorneoModulo.findById(torneoId);
      
      if (!torneo) {
        return res.status(404).json({ message: 'Torneo no encontrado' });
      }
  
      // Encontramos el equipo dentro del torneo
      const equipo = torneo.equipos.find(e => e.equipo.toString() === equipoId);
      
      if (!equipo) {
        return res.status(404).json({ message: 'Equipo no encontrado en este torneo' });
      }
  
      // Actualizamos los puntos
      equipo.puntos = puntos;
  
      await torneo.save();  // Guardamos el torneo con los puntos actualizados
  
      return res.json(torneo);  // Devolvemos el torneo actualizado
    } catch (error) {
      console.error("Error al actualizar los puntos:", error);
      return res.status(500).json({ message: 'Error al actualizar los puntos' });
    }
  });

 // Ruta para obtener detalles del torneo
// Ruta para obtener detalles del torneo
app.get('/torneo/:id', async (req, res) => {
    try {
      const torneo = await TorneosModulo.findById(req.params.id)
        .populate('equipos.equipo')  // Esto hace el populate de los equipos
        .exec();
  
      if (!torneo) {
        return res.status(404).json({ message: 'Torneo no encontrado' });
      }
  
      res.json(torneo);  // Devolver los detalles del torneo
    } catch (error) {
      console.error('Error al obtener el torneo:', error);
      res.status(500).json({ message: 'Error al obtener los detalles del torneo' });
    }
  });
  
  
// Ruta para eliminar un equipo de un torneo
app.delete('/torneo/:torneoId/equipos/:equipoId', async (req, res) => {
    const { torneoId, equipoId } = req.params;
  
    try {
      // Busca el torneo por su ID usando TorneosModulo
      const torneo = await TorneosModulo.findById(torneoId);
  
      if (!torneo) {
        return res.status(404).json({ error: 'Torneo no encontrado' });
      }
  
      // Elimina el equipo del array de equipos
      torneo.equipos = torneo.equipos.filter((e) => e.equipo.toString() !== equipoId);
  
      // Guarda los cambios en el torneo
      await torneo.save();
  
      res.json({ message: 'Equipo eliminado del torneo' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el equipo' });
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
        const { nombreUsuario, correo, contraseña,img,ptos} = req.body
        //crear nuevo modelo por el de los jugadores
        const nuevoJugador=new ServerMod.JugadorModulo({
            nombreUsuario,
            correo,
            contraseña:hashpwd(contraseña),
            img,
            ptos,
            dir:"",
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
        const{id,direccion,email,user,pwd}=req.body;
        //actualizar los datos de usuarios
        const actualiza=await ServerMod.JugadorModulo.findByIdAndUpdate(
            id,
            {
                correo:email,
                nombreUsuario:user,
                dir:direccion,
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

  // Ruta para manejar equipos
  app.get('/equipos', async (req, res) => {
    try {
        const equipos=await ServerMod.EquiposModulo.find({});
        res.status(200).json(equipos) 
    } catch (error) {
        res.status(500).json(console.error(error));
    }

    //agregar los equipos al torneo
    app.post('/agregarEquipos',async(req,res)=>{
        try {
            //conseguir el cuerpo de petición
            const{tipoJuego,eqElegido}=req.body;
            //actualizar los datos de usuarios
            const actualiza=await ServerMod.TorneosModulo.findOneAndUpdate(
                {tipoJuego:tipoJuego},
                { $addToSet: { equipos: { $each: eqElegido } } },
                { new: true } 
            )
            if (actualiza) {
                res.status(200).send(actualiza)
            }else{
                res.status(401).send("actualizar fallado")
            }
        } catch (error) {
            res.status(500).send('error de servidor')
        }
      })
});

   // Ruta para manejar el login de administrador
   app.post('/admin', async (req, res) => {
    try {
        const { user, pwd } = req.body;
        const confirmar = await ServerMod.AdminModelo.findOne({
            usuario: user,
            password: hashpwd(pwd)
        });

        if (confirmar) {
            res.status(200).json("éxito");
        } else {
            res.status(401).json("usuario o contraseña incorrectos");
        }
    } catch (error) {
        res.status(500).json(console.error(error));
    }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;//configurar el n'umero de puerto. Intenta obtener el número puerto. Si no, se utilizará el puerto 3001
app.listen(PORT, () => console.log(`Ya está realizando en el puerto de servidor ${PORT}`));//comprobar que servidor si está ejecutando bien.