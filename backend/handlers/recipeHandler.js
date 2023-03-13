import path from "path";
const CWD = process.cwd();
const {Recipe, Recommended} = require('../separate/recipeSchema.js');

const retrieveRecipe = (req, res, next) => {
  const reqId = req.params.recipeId;
  console.log(`reqid: ${reqId}`);
  Recipe.findOne({id: reqId}, function (err, searchedRecipe) { 
    if (err) throw err; 
    res.status(200).json({
      message: "Success",
      recipe: searchedRecipe
    });
  });
};

export default retrieveRecipe;
