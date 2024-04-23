
import Pegi12 from "./pegi12";
import Usk12 from "./usk12";
import "./footer.css"
function Footer() {
    
    const parrafo1=["Acerca de", "Servicio", "El equipo"];
    const parrafo2=["Soporte de organización y jugadores","Centro de apoyo","Red sociales"];
    const logoSocial = ["bx bxl-twitter","bx bxl-discord-alt","bx bxl-skype","bx bxl-pinterest" ];

    return(
        <footer>
            <div className="principal">
                <div className="informacion">
                    <div>
                        <h3>INFORMACIÓN</h3>
                        <hr />
                        {parrafo1.map((texto,index)=>(<p key={index}>{texto}</p>))}
                    </div>
                    <div>
                        <h3>CONTACTO</h3>
                        <hr />
                        {parrafo2.map((texto,index)=>(<p key={index}>{texto}</p>))}
                        {logoSocial.map((logo,index)=>(<i key={index} className={logo}></i>))}
                    </div>
                </div>
                <div className="pegi12">
                    <div><Pegi12/></div>
                    <div><Usk12/></div>
                </div>
            </div>
            <hr />
            <div className="politica">
                <p>@ 2024 OnlyGG</p>
                <p>Política de privacidad</p>
            </div>
        </footer>
    )
}

export default Footer