const axios = require('axios');
const { Diet } = require('../db');
require('dotenv').config();
const {API_KEY} = process.env;

// module.exports = {
//   diet: async () => {
//     const data = await Diet.findByPk(1)
//     if (!data) {
//       const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
//       const diet = dietApi.data.results.map((el) => el.diets);
//       let data2 = diet.flat();
//       const typeDiet = [...new Set(data2)];
//       typeDiet.forEach((el) => {
//         Diet.findOrCreate({
//           where: { name: el },
//         });
//       });
//       console.log('Se han cargado los datos de las dietas desde la API');
//     } else {
//       console.log('Los datos de las dietas ya están cargados en la base de datos');
//     }
//     return 'Proceso finalizado';
//   }
// };
const diet = async() => {
  const data = await Diet.findByPk(1)
  if(!data){
    const arrDietas = []
    const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const diet = dietApi.data.results.flatMap((e)=> e.diets);
    const arr = new Set(diet);
    const dietas = [...arr,"vegetarian"];
    dietas.forEach((el) => {
      Diet.findOrCreate({
        where: { name: el },
      })
    })
    console.log('Se han cargado los datos de las dietas desde la API');
  } else{
    console.log('Los datos de las dietas ya están cargados en la base de datos');
  }
  return 'Proceso finalizado';
}

module.exports = { diet };
