import "./howToPlay.css";
import { motion } from "framer-motion";
import img1 from "../img/teamUp.png";
import img2 from "../img/join.png";
import img3 from "../img/rewards.png";
function How() {

    const imgs=[img1,img2,img3];
    const titulo = ["1. Team Up","2. Team Down","3. Rewards"];
    return(
        <main className="how">
            <h1>How To Play</h1>
            {imgs.map((img,index)=>(
            <motion.div key={index} className="proceso">
                <img src={img} alt="" />
                <h3>{titulo[index]}</h3>
                <p></p>
            </motion.div>))}
        </main>
    )
}
export default How;