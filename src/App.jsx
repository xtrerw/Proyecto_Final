
import './App.css'
import Header from "../src/componentes/header";
import Footer from "../src/componentes/footer";
import Titulo from "./componentes_index/titulo";
import How from './componentes_index/howToPlay';
import Noticias from './componentes_index/noticias';
function App() {
  return (
    <>
      <Header/>
      <Titulo/>
      <How/>
      
      <Noticias/>
      <Footer/>
    </>
  )
}

export default App
