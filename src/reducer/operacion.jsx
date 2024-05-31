//tramita las acciones que est'an en archivo action
const operacion = (state,action) => {
    //determinar tipo de la acci'on
  switch (action.type) {
    case "ENVIARPTOS":
        return action.payload  
    default:
        return state;
  }
}

export default operacion
