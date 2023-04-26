const { Router } = require('express');
const { Diet } = require('../db')
const { dietsHandler } = require('../handlers/dietsHandler')

const dietsRouter = Router();

dietsRouter.get('/', dietsHandler)

module.exports = { dietsRouter }