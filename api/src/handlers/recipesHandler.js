const { getAllInfo } = require('../controllers/getAllInfo');
const { getApiInfoById } = require('../controllers/getApiInfoById');
const { getDbInfoById } = require('../controllers/getDbInfoById');
const { Recipe, Diet } = require('../db')

const handlerAllInfo = async(req,res)=>{
    const { name } = req.query;
    let allInfo = await getAllInfo();
    
    if (name) {
      try {
        let filteredRecipe = await allInfo.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
  
        filteredRecipe.length
          ? res.status(200).send(filteredRecipe)
          : res.status(404).send("Recipe not found");
      } catch (error) {
        return res.status(400).send("Something went wrong handlerAllInfo");
      }
    } else {
      res.send(allInfo);
    };
}

const handlerRecipeId = async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe.length > 10) {
      let recipeDb = await getDbInfoById(idRecipe);
      return res.status(200).send(recipeDb);
    }
    let recipeApi = await getApiInfoById(idRecipe);
    console.log("hola")
    let recipeDetail = {
      image: recipeApi.data.image,
      name: recipeApi.data.title,
      diets: recipeApi.data.diets,
      summary: recipeApi.data.summary,
      healthScore: recipeApi.data.healthScore,
      steps: recipeApi.data.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
          ingredients: e.ingredients,
        };
      }),
    };

    return res.status(200).send(recipeDetail);
  } catch (error) {
    res.status(400).send("Something went wrong handlerRecipeId");
  }
}

const handlerByName = async (req, res) => {
  const { name } = req.query;
  let allInfo = await getAllInfo();
  
  if (name) {
    try {
      let filteredRecipe = await allInfo.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      filteredRecipe.length
        ? res.status(200).send(filteredRecipe)
        : res.status(404).send("Recipe not found");
    } catch (error) {
      return res.status(400).send("este es el catch del controller handlerByName");
    }
  } else {
    res.send(allInfo);
  }
}

const handlerPostRecipe = async (req, res) => {
  const { name, summary, health_score, steps, image, dietTypes } = req.body;
  if (!name || !summary || !health_score || !steps || !dietTypes)
    return res.status(400).send("Missing data handlerPostRecipe");

  const newRecipe = await Recipe.create({
    name,
    summary,
    health_score,
    steps,
    image,
  });

  let getDiet = await Diet.findAll({
    where: {
      name: dietTypes,
    },
  });
let response = await newRecipe.addDiet(getDiet)
console.log(response)

res.status(200).send(response)
};

const handlerDeleteRecipe = (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.send("Recipe deleted");
    })
    .catch((error) => {
      res.status(400).send("Something went wrong");
    });
};


module.exports = { handlerAllInfo, handlerRecipeId, handlerByName, handlerPostRecipe, handlerDeleteRecipe};