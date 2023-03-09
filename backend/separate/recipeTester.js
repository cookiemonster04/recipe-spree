//Used to print all recipes for validation purposes
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Recipe, Recommended} = require('./recipeSchema.js');
const connectDB = require('../connectDb.js');

connectDB();
Recipe.find({}, function (err, count) 
{
    if (err) throw err;
    console.log(count);
    mongoose.connection.close();
    console.log("closed");
});