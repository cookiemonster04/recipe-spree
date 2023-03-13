import path from "path";
const CWD = process.cwd();
const {Recipe, Recommended} = require('../separate/recipeSchema.js');
const mongoose = require("mongoose");
const connectDB = require('../connectDb.js');

const retrieveRecipe = (req, res, next) => {
  const reqId = req.params.recipeId;
  //connectDB();
  console.log(`reqid: ${reqId}`);
  Recipe.findOne({id: reqId}, function (err, searchedRecipe) { 
    if (err) throw err; 
    res.status(200).json({
      message: "Success",
      recipe: searchedRecipe
    });
    //console.log(searchedRecipe);
  });
  //res.sendFile(path.join(CWD, `backend/separate/individual/${reqId}.json`));
};

export default retrieveRecipe;
