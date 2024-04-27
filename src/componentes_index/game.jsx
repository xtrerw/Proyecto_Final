
import { useGSAP } from '@gsap/react';
import './game.css';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/src/ScrollTrigger";
function OurGames() {
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        let iteration = 0;
        const spacing = 0.2,
            cards = gsap.utils.toArray('.games>img');
            gsap.set('.games>img',{scale:1,opacity:1,xPercent:200})
        const animateFunc = (element) => {
            const tl = gsap.timeline();
            
            tl.fromTo(element, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false})
            .fromTo(element, { xPercent: 100 }, { xPercent: -100, duration: 1, ease: "none" },0);
            return tl;
        };
    
        const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
    
        ScrollTrigger.create({
            trigger: ".our-games",
            pin: ".our-games",
            markers: true,
            start: "0 20%",
            end: "200% 50%",
            repeat: -1,
            onUpdate(self) {
                seamlessLoop.time(iteration + self.progress);
            }
        });
    
        function buildSeamlessLoop(items, spacing, animateFunc) {
            let rawSequence = gsap.timeline({ paused: true }),
                seamlessLoop = gsap.timeline({ paused: true });
    
            items.concat(items).forEach((item, i) => {
                let anim = animateFunc(items[i % items.length]);
                rawSequence.add(anim, (i) * spacing);
            });
    
            seamlessLoop.fromTo(rawSequence, {
                time: 0
            }, {
                time: "+=" + rawSequence.duration(),
                duration: rawSequence.duration()
            });
    
            return seamlessLoop;
        }
    });
    

    return(
        <main className='our-games'>
            <h1>Our Games</h1>
            <div className='games'>
                <img src="src\img\lol.png" alt="" />
                <img src="src\img\tft.png" alt="" />
                <img src="src\img\valorant.png" alt="" />
            </div>
        </main>        
    )
}

export default OurGames;