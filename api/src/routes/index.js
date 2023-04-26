const { Router } = require('express');
const { recipeRouter } = require('./recipeRouter');
const { dietsRouter } = require('./dietsRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const routes = Router();

routes.use("/recipes", recipeRouter);
routes.use("/diets", dietsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = routes;
