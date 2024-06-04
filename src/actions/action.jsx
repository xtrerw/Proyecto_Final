//construir acción de enviar datos
export const enviarPtos =(puntos) => {
    return {
        //nombre de acción
        type: 'ENVIARPTOS',
         //parametros de acción
        payload: puntos
    }
};
export const actualizarDatos =(datosPersona) => {
    return {
        //nombre de acción
        type: 'DATOS',
         //parametros de acción
        datos: datosPersona
    }
};