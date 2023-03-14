//Functions where the user interacts with recipes
//const mongoose = require("mongoose");
const {Recipe, Recommended} = require('./recipeSchema.js');

//Frontend should probably check if star is already clicked or not
//Then call addStar or removeStar accordingly
async function addStar(itemID) 
{
    Recipe.findOneAndUpdate(
        { id: itemID },
        { $inc: { favorites: 1 } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

async function removeStar(itemID) 
{
    Recipe.findOneAndUpdate(
        { id: itemID },
        { $inc: { favorites: -1 } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

async function addComment(itemID, comment) 
{
    Recipe.findOneAndUpdate(
        { id: itemID },
        { $push: { comments: {text: comment} } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

async function addRating(itemID, newRating) 
{
    const recipe = await Recipe.findOne({ id: itemID });
    const updatedRating = (recipe.rating.stars * recipe.rating.numRatings + newRating) / (recipe.rating.numRatings + 1);
    Recipe.findOneAndUpdate(
        { id: itemID },
        { $set: { rating: {stars: updatedRating, numRatings: recipe.rating.numRatings + 1} } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}
module.exports = {addStar, removeStar, addComment, addRating};
