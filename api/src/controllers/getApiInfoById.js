const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getApiInfoById = async (id) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch recipe data from API');
    }
  };

module.exports = { getApiInfoById };