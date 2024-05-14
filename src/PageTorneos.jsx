
import "./PageTorneos.css"
import TituloPaginas from './componentes_paginas/tituloPaginas';
const Torneos = () => {
    const state={img:'src/img/bg3.png',title:"Torneos",description:"Alcanza la victoria"};
    return (
        <TituloPaginas img={state.img} titulo={state.title} des={state.description}/>
    )
}

export default Torneos
