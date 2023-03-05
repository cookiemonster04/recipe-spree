//Functions where the user interacts with recipes
const mongoose = require("mongoose");
const {Recipe, Recommended} = require('./recipeSchema.js');

//Frontend should probably check if star is already clicked or not
//Then call addStar or removeStar accordingly
async function addStar(itemID) 
{
    Recommended.findOneAndUpdate(
        { id: itemID },
        { $inc: { favorites: 1 } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

async function removeStar(itemID) 
{
    Recommended.findOneAndUpdate(
        { id: itemID },
        { $inc: { favorites: -1 } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

async function addComment(itemID, comment) 
{
    Recommended.findOneAndUpdate(
        { id: itemID },
        { $push: { comments: {text: comment} } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

async function addRating(itemID, newRating) 
{
    const recipe = await Recommended.findOne({ id: itemID });
    const updatedRating = (recipe.rating.stars * recipe.rating.numRatings + newRating) / (recipe.rating.numRatings + 1);
    console.log(recipe.rating.stars);
    console.log(recipe.rating.numRatings);
    console.log(newRating);
    Recommended.findOneAndUpdate(
        { id: itemID },
        { $set: { rating: {stars: updatedRating, numRatings: recipe.rating.numRatings + 1} } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}
module.exports = {addStar, removeStar, addComment, addRating};
