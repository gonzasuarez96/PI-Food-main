const { Recipe, Diet } = require("../db");

const getDbInfoById = async(id) => {
    return await Recipe.findByPk(id, {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
    });
}

module.exports = { getDbInfoById };