import path from "path";
const {a, b, c, d, getRatingInformation} = require("../separate/recipeFunctions.js");
const CWD = process.cwd();
const getRecipe = async (req, res, next) => {
  const reqRecipe = req.params.recipeId;
  console.log("reqRecipe: " + reqRecipe);
  const foundRecipe = getRatingInformation(reqRecipe);
  console.log("found recipe:");
  console.log(foundRecipe);
  res.status(201).json(foundRecipe);
};
const retrieveRecipe = (req, res, next) => {
  const reqId = req.params.recipeId;
  console.log(`reqid: ${reqId}`);
  res.sendFile(path.join(CWD, `backend/separate/individual/${reqId}.json`));
};

export {getRecipe, retrieveRecipe};
