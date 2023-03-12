//Adds recipes to the database
//This script has already been run and the recipes are in the DB
//No need to rerun this script again
const fs = require('fs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Recipe, Recommended} = require('./recipeSchema.js');
const connectDB = require('../connectDb.js');

fs.readFile('./layer1.json', 'utf8', function read(err,data)
{
    if (err)
        throw(err);
    const content = data;
    addRecipes(content);
});

async function addRecipes(content)
{                           
    await connectDB();
    await Recipe.deleteMany({})
        .then(() => console.log('Existing recipes cleared'))
        .catch(error => console.error(error));
    const recipe = JSON.parse(content);
    for (let i = 0; i < 1000; i++)
    {
        const itemID = recipe[i].id;
        recipe[i].favorites = 0;
        delete recipe[i].partition;
        const newRecipe = new Recipe(recipe[i]);
        await newRecipe.save()
            .then(() =>
            {
                console.log('Added recipe with ID ' + itemID);
            })
            .catch((e) =>
            {
                console.log("Error", e.stack);
                console.log("Error", e.name);
                console.log("Error", e.message);
                console.log('Failed to add recipe with ID ' + itemID);
            });
    }
    mongoose.connection.close();
}