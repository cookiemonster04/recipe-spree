import path from "path";
const CWD = process.cwd();
const {Recipe, Recommended} = require('./recipeSchema.js');
const retrieveRecipe = (req, res, next) => {
  const reqId = req.params.recipeId;
  console.log(`reqid: ${reqId}`);
  Recipe.find({id: reqID}, function (err, searchedRecipe) { 
    if (err) throw err; 
    res.status(200).json({
      message: "Success",
      recipe: searchedRecipe,
    });
  });
  //res.sendFile(path.join(CWD, `backend/separate/individual/${reqId}.json`));
};

export default retrieveRecipe;
