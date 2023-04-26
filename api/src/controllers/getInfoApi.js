const axios = require('axios');
const {API_KEY} = process.env;


const getInfoApi = async () => {
    const apiInfo = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const apiData = await apiInfo.data.results.map((e) => {
      return {
        id: e.id,
        name: e.title,
        summary: e.summary,
        health_score: e.healthScore,
        image: e.image,
        diets: e.diets,
        steps: e.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
            ingredients: e.ingredients,
          };
        }),
      };
    });
    return apiData;
  };

module.exports = { getInfoApi }