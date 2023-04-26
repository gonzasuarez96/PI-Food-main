const { Recipe, Diet } = require("../db");

const getInfoDb = async() => {
    return await Recipe.findAll({
        include: {
          model: Diet,
          attributes: ["name"],
        },
    });
}

module.exports = { getInfoDb };