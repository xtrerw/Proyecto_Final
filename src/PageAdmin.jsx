import React, { useEffect, useState } from 'react'
import { motion} from 'framer-motion'
import '/src/PageAdmin.css'
const Admin = () => {
    
    //responsive de path
    const[pathDato,setPath]=useState('');
    useEffect(()=>{
        //si tamaño de windows mayor q 1400px
        if (window.innerWidth>1400) {
            setPath('M 20,0 0,50 L 0,600 L 460,600 500,500 500,0 Z');
        }
    },[])
    //animacion de titulo de formulario
    const t1="Administrador";
    const span=t1.split('');
    //animacion de input
    const labelAnimation={
        aparece:{
            opacity:[0,1],
            y:[50,0],
            transition:{
                duration:3,
                ease:'anticipate',
                delay:1,
            }
        }
    };
    //hover input
    const[hover1,setHover1]=useState(false);
    const[hover2,setHover2]=useState(false);
    //administrador iniciar sesion 
    const[admin,setAdmin]=useState({
        us:'',
        pwd:'',
    });
    //introducir los datos a parametro admin cuando enviar el formulario
    const submitDatos=(evento)=>{
        const {nombre, valor}=evento.targets;
        setAdmin({
            ...admin,
            [nombre]:valor,
        })
    };
    useEffect(()=>{
        fetch('http://localhost:3001/admin',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
            }),
        });
    })
  return (
    <main className='bg-admin'>
        <motion.video className="bg-video"
        autoPlay loop muted
        initial={{
            opacity:0,
            width:"100%",
            height:"100%",
        }}
        animate={{
            opacity:1,
            width:"80%",
            height:"80%",
            borderRadius:20,
            boxShadow:"inset 0 0 10px 1px #000"
        }}
        transition={{
            delay:3,
            duration:3,
            ease:'anticipate',
        }}
        >
            
            <source src="../src/img/bg-admin.mp4" type="video/mp4"/>
        </motion.video>
         <form className="admin-form" onSubmit={submitDatos}>
            {/* border de form */}
            <motion.svg className='admin-border' fill='#fff'
            >
                <motion.path 
                d={pathDato}
                animate={{
                    stroke:["#06ced4","#c46fc6", "var(--main-color)"],
                    pathLength:[0,1],
                    strokeWidth: [50,20],
                    strokeOpacity:[0,1]
                }}
                transition={{
                    duration:3,
                    ease: 'anticipate',
                }}
                >
                </motion.path>
            </motion.svg>
            {/* titulo de form */}
            <h2 className='admin-titulo'>
                {span.map((sp,index)=>(
                    <motion.span key={index}
                    animate={{
                        color:["#06ced4", "#c46fc6","var(--main-color)"],
                        margin:[10,20,20,2]
                    }}
                    transition={{
                        duration:3,
                        ease: 'backInOut',
                        delay: index/10,
                    }}
                    >
                        {sp}
                    </motion.span>
                ))}
            </h2>
             {/* label input */}
            <motion.label htmlFor="user-admin"
            variants={labelAnimation}
            animate='aparece'
            >
                <motion.p
                animate={{
                    color: hover1? "var(--main-color)":"#c3c3c3",
                }}
                >Usuario</motion.p>
                <motion.input type="text"
                onMouseEnter={()=>setHover1(true)}
                onMouseLeave={()=>setHover1(false)}
                animate={{
                    boxShadow: hover1? "inset 0 0px 1px 3px var(--main-color)":"none",
                }}
                />
            </motion.label>
            <motion.label htmlFor="pwd-admin"
            variants={labelAnimation}
            animate='aparece'
            >
                <motion.p
                animate={{
                    color: hover2? "var(--main-color)":"#c3c3c3",
                }}
                >Contraseña</motion.p>
                <motion.input type="password" 
                     onMouseEnter={()=>setHover2(true)}
                     onMouseLeave={()=>setHover2(false)}
                     animate={{
                         boxShadow: hover2? "inset 0 0px 1px 3px var(--main-color)":"none",
                     }}
                />
            </motion.label>
            <motion.button type='submit' className='btn-admin'
            variants={labelAnimation}
            animate='aparece'
            whileHover={{
                backgroundColor:"var(--main-color2)"
            }}
            >
                Iniciar sesión
            </motion.button>
        </form>
       
  </main>
  )
}

export default Admin
