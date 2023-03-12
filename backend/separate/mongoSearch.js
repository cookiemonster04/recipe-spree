//search function takes a list of wanted and unwanted ingredients as inputs
//Recommended recipes are stored under the "Recommended" model in the DB
//Do some command like Recommended.find({}, function (err, count)... to get full list
const fs = require('fs');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Recipe, Recommended} = require('./recipeSchema.js');
const connectDB = require('../connectDb.js');

testDesired = ["chicken", "potato", "pepper", "garlic", "egg", "rice", "mushroom", "tea"];
testUndesired = ["onion", "beef", "pork", "peanut", "broccoli"];

search(testDesired, testUndesired);

async function search(desired, undesired)
{
    await connectDB();
    await Recommended.deleteMany({})
        .then(() => console.log('Existing recipes cleared'))
        .catch(error => console.error(error));
    await addDesired(desired);
    console.log('Finished adding');
    await removeUndesired(undesired);
    const sortedResults = await Recommended.find().sort({ score: -1 });
    console.log('Finished sorting');
    console.log(sortedResults.map(result => result.score));
    return sortedResults.map(result => result.id);
}

async function addDesired(desired) 
{
    let finished = false;
    setTimeout(() => {
        console.log("Finished adding");
        finished = true;
    }, 100000);
    for (const element of desired) {
        const regex = new RegExp(element, 'i');
        const matches = await new Promise((resolve, reject) => {
            Recipe.find({"ingredients.text": regex}, function (err, matches) {
                if (err) return reject(err);
                resolve(matches);
            });
        });
        for (const match of matches) {
            await updateOrCreate(match);
            if (finished) break;
        }
        if (finished) break;
    }
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
            Recommended.deleteMany({"ingredients.text": regex}, function(err, result) {
                if (err) throw err;
                console.log(result.deletedCount + " documents deleted");
            });
        });
}

module.exports = search;