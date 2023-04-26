const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const { handlerAllInfo, handlerRecipeId, handlerByName, handlerPostRecipe, handlerDeleteRecipe } = require('../handlers/recipesHandler')

const recipeRouter = Router();

recipeRouter.get('/',handlerAllInfo)

recipeRouter.get("/name", handlerByName);

recipeRouter.get('/:idRecipe',handlerRecipeId)

recipeRouter.post("/", handlerPostRecipe)

recipeRouter.delete("/:id", handlerDeleteRecipe)


  module.exports = { recipeRouter }