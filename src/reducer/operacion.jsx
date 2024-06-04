//tramita las acciones que est'an en archivo action
const operacion = (state,action) => {
    //determinar tipo de la acci'on
  switch (action.type) {
    //seg'un action devolver los parametro
    case "ENVIARPTOS":
        return action.payload  
    case "DATOS":
        return action.datos
    default:
        return state;
  }
}

export default operacion
//asignar esta operacion en archivo main.jsx