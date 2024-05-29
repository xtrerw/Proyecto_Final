
import ServerMod from "./server.js";
import express from "express";
import cors from "cors";
import session from "express-session";

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

// API de tramito del registro
app.post('/registro', async (req, res) => {
    try {
        //conseguir los datos de la cuerpo de petición enviado desde la pageRegistro
        const { nombreUsuario, nombre, apellidos, fechaN, correo, contraseña} = req.body
        //crear nuevo modelo por el de los jugadores
        const nuevoJugador=new ServerMod.JugadorModulo({
            nombreUsuario,
            nombre,
            apellidos,
            fechaN,
            correo,
            contraseña
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
  app.post('/iniciar', async(req, res)=>{
    try {
        const {nombreIS,contraseñaIS}=req.body
        //encontrar el usuario en modelo de jugador
        const confirmar = await ServerMod.JugadorModulo.findOne({
            nombreUsuario:nombreIS,
            contraseña:contraseñaIS
        })
        
        console.log(confirmar);
        if (confirmar) {
            console.log(confirmar);
            //estabelecer el ID del usuario en la sesion
            req.session.userID=confirmar._id
            res.status(200).send(req.session.userID);
        }else{
            console.log(confirmar);
            res.status(401).send({ error: '401 la petición (request) no ha sido ejecutada'});
        }
    } catch (error) {
        res.json({error:'Error del servidor'})
    }
  })
  //cuando el usuario ya iniciar sesión, realizar la peticion de conseguir informacion de este usuario a base de datos
  app.get('/perfil',async(req,res)=>{
    try {
        //conseguir id de usuario quien ya iniciar sesión
        const idUser=req.query.id
        //consulta informacion de este usuario y lo devolve a react
        const jugador= await ServerMod.JugadorModulo.findOne({
            _id:idUser,
        });
        console.log(jugador);
        if (jugador) {
            console.log(jugador);
            res.status(200).send(jugador);
        }
    } catch (error) {
        res.json({error:'Error del servidor'})
    }
  })

  //actualizar los ptos de usuarios
  app.put('/canejo',async(req,res)=>{
    try {
        const {id,ptos}=req.body
        const actualiza= await ServerMod.JugadorModulo.replaceOne({
             _id: id,
            ptos: ptos 
        });
        if (actualiza) {
            console.log(actualiza);
            res.status(200).send(actualiza)
        }else{
            console.log(actualiza);
            res.status(500).send({ error: 'actualizar fallado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
  })
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;//configurar el n'umero de puerto. Intenta obtener el número puerto. Si no, se utilizará el puerto 3001
app.listen(PORT, () => console.log(`Ya está realizando en el puerto de servidor ${PORT}`));//comprobar que servidor si está ejecutando bien.