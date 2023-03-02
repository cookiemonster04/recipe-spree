const fs = require('fs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Recipe, Recommended} = require('./recipeSchema.js');
const connectDB = require('../connectDb.js');

testDesired = ["chicken", "potato"];
testUndesired = ["onion"];

search(testDesired, testUndesired);

async function search(desired, undesired)
{
    await connectDB();
    await Recommended.deleteMany({})
        .then(() => console.log('Existing recipes cleared'))
        .catch(error => console.error(error));
    //Looping through array of desired ingredients
    await desired.forEach(element =>
        {
            const regex = new RegExp(element, 'i');
            //Finds all matching recipes for one ingredient
            Recipe.find({"ingredients.text": regex}, function (err, matches) 
            {
                if (err) throw err;
                //Looping through each matched recipe
                matches.forEach(function(match) 
                {
                    //Checks if the recipe already has already been added
                    Recommended.findOne({id: match.id}, function (err, recipe) 
                    {   
                        if (!recipe)
                        {
                            const newMatch = new Recommended(match.toObject());
                            newMatch.score = 1;
                            newMatch.save();
                            //console.log("match.id");
                        }
                        else
                        {
                            recipe.score += 1;
                        }
                    });
                });
            });
        });
    //mongoose.connection.close();
    console.log("closed");
}
module.exports = search;