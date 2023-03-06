//search function takes a list of wanted and unwanted ingredients as inputs
//Recommended recipes are stored under the "Recommended" model in the DB
//Do some command like Recommended.find({}, function (err, count)... to get full list
const fs = require('fs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Recipe, Recommended} = require('./recipeSchema.js');
const connectDB = require('../connectDb.js');

testDesired = ["chicken", "potato", "pepper"];
testUndesired = ["onion"];

search(testDesired, testUndesired);

async function search(desired, undesired)
{
    await connectDB();
    await Recommended.deleteMany({})
        .then(() => console.log('Existing recipes cleared'))
        .catch(error => console.error(error));
    await addDesired(desired);
    function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms));}
    //Don't search for more than 1 second, just get whatever recipes can be found in 1 second
    wait(1000).then(() => {
        removeUndesired(undesired);
    });
    await Recipe.find().sort({ score: -1 });
    //Add extra delay to prevent DB from closing before search is done
    wait(5000).then(() => {
        mongoose.connection.close();
        console.log("Connection closed");
    });
}
async function addDesired(desired, callback)
{
    desired.forEach(element =>
        {
            const regex = new RegExp(element, 'i');
            //Finds all matching recipes for one ingredient
            Recipe.find({"ingredients.text": regex}, function (err, matches)
            {
                if (err) throw err;
                //Looping through each matched recipe
                matches.forEach(function(match)
                {
                    updateOrCreate(match);
                });
            });
        });
}
async function updateOrCreate(match)
{
    //Checks if the recipe already has already been added
    const filter = {id: match.id};
    const update = {$inc: {score: 1}, $setOnInsert: match};
    const options = { new: true, upsert: true, runValidators: true };
    const result = await Recommended.findOneAndUpdate(filter, update, options);
    return result;
}
async function removeUndesired(undesired)
{
    await undesired.forEach(element =>
        {
            const regex = new RegExp(element, 'i');
            console.log(regex);
            Recommended.deleteMany({"ingredients.text": regex}, function(err, result) {
                if (err) throw err;
                console.log(result.deletedCount + " documents deleted");
            });
        });
}

module.exports = search;