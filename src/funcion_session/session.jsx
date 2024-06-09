// almanecer los datos de perfil
export const saveUserData = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    console.log("saveUserData"+user);
  };
  
// cargar los datos de perfil
export const loadUserData = () => {
    const userData = localStorage.getItem('user');
    console.log('Loaded user data:', userData);
    return userData ? JSON.parse(userData) : null;
  };
// almancer los datos de equipos
export const saveEquiposData = (equipo) => {
  localStorage.setItem('equipo', JSON.stringify(equipo));
}
//cargar los datos de equipos
export const loadEquiposData = () => {
  const equipo = localStorage.getItem('equipo');
  console.log('Loaded user data:', equipo);
  return equipo ? JSON.parse(equipo) : null;
};
