import './game.css';
import { useState } from 'react';
function OurGames() {
    const images = [
        "src/img/lol.png",
        "src/img/tft.png",
        "src/img/valorant.png"
      ];
      const [img, cambioPos] = useState(1);
    
      const next = () => {
        cambioPos((index) => (index + 1) % images.length);
      };
    
      const back = () => {
        cambioPos((index) => (index - 1 + images.length) % images.length);
      };


      return (
        <main className='our-games'>
          <h1>Our Games</h1>
          <div className='games'>
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                style={{
                  transform: `translateX(${index-img==2 ? 100*(index-images.length) : 
                    index-img==-2 ? 100*(index+1):100 * (index-img)}%) 
                  scale(${index == img ? 1.2 : 1})`,
                  zIndex: index>img ? -2: index<img ? -3:-1,
                  opacity: index==img ? 1:0.2,
                  transition: 'transform 1s ease',
                  scale:1
                }}
              />
            ))}
          </div>
          <div className='btn-our-games'>
            <button onClick={back} className="back"><i className='bx bxs-chevron-left' ></i></button>
            <button onClick={next} className="next"><i className='bx bxs-chevron-right' ></i></button>
          </div>
        </main>
      );
}

export default OurGames;