//Functions where the user interacts with recipes
//const mongoose = require("mongoose");
const {Recipe, Recommended} = require('./recipeSchema.js');
import { catchWrap } from "../middleware/errorHandler.js";

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

const addStarHandler = catchWrap(async (req, res, next) => {
    const { itemID } = req.body;
    await addStar(itemID);
    res.status(200).send("Star added successfully");
  });

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

const removeStarHandler = catchWrap(async (req, res, next) => {
    const { itemID } = req.body;
    await removeStar(itemID);
    res.status(200).send("Star removed successfully");
  });

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

const addCommentHandler = catchWrap(async (req, res, next) => {
    const { itemID, comment } = req.body;
    await addComment(itemID, comment);
    res.status(200).send("Comment added successfully");
  });

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

const addRatingHandler = catchWrap(async (req, res, next) => {
    const { itemID, newRating } = req.body;
    addRating(itemID, newRating);
    res.status(200).send("Rating added successfully");
  });

export {addStar, removeStar, addComment, addRating, 
        addStarHandler, removeStarHandler, addCommentHandler, addRatingHandler};
