//Adds urls to recipes in db
//This script has already been run and the recipes are in the DB
//No need to rerun this script again
const fs = require('fs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Recipe, Recommended} = require('./recipeSchema.js');
const connectDB = require('../connectDb.js');

fs.readFile('./layer2.json', 'utf8', function read(err,data)
{
    if (err)
        throw(err);
    const content = data;
    appendURLs(content);
});

async function appendURLs(content) 
{
    await connectDB();
    const recipe = JSON.parse(content);
    for (let i = 0; i < 1000; i++) {
        const itemID = recipe[i].id;
        const updatedRecipe = await Recipe.findOneAndUpdate(
            { id: itemID },
            { $set: { image: recipe[i].images[0].url } },
            { new: true }
        ).exec();
        console.log("Appended url to recipe with ID " + itemID);
    }
    const pruneRecipe = await Recipe.deleteMany(
        {image: { $exists: false}}
    ).exec();
    mongoose.connection.close();
}