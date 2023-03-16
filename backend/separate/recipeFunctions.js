//Functions where the user interacts with recipes
//const mongoose = require("mongoose");
const {Recipe, Recommended} = require('./recipeSchema.js');
import User from '../models/userModel.js';
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

async function addComment(itemID, selectedUsername, comment) 
{
    Recipe.findOneAndUpdate(
        { id: itemID },
        { $push: { comments: {text: comment} } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
    User.findOneAndUpdate(
        { username: selectedUsername },
        { $push: { comments: {text: comment} } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

const addCommentHandler = catchWrap(async (req, res, next) => {
    const { itemID, selectedUsername, comment } = req.body;
    await addComment(itemID, selectedUsername, comment);
    res.status(200).send("Comment added successfully");
  });

async function addRating(itemID, newRating, user) 
{
    const recipe = await Recipe.findOne({ id: itemID });
    console.log("g")
    console.log(itemID)
    console.log("h")
    console.log(recipe)
    console.log("i")
    console.log(recipe.rating)
    if (!recipe.rating) {
        Recipe.findOneAndUpdate(
            { id: itemID },
            { $set: {rating: {stars: 0, numRatings: 0}} },
            {new: true}, 
            function (err, count) 
            { if (err) throw err; }
        );
    }
    console.log("j")
    console.log(recipe)
    const updatedRating = (recipe.rating.stars * recipe.rating.numRatings + newRating) / (recipe.rating.numRatings + 1);
    Recipe.findOneAndUpdate(
        { id: itemID },
        { $set: { rating: {stars: updatedRating, numRatings: recipe.rating.numRatings + 1} } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
    let curUser = await User.findOne({ username: user });
    console.log("x")
    console.log(curUser)
    console.log("w")
    console.log(curUser.ratings)
    let ratingDict;
    if (!curUser.ratings) {
        ratingDict = new Map();
    }
    else {
        ratingDict = curUser.ratings;
    }
    ratingDict.set(itemID, newRating);
    User.findOneAndUpdate(
        { username: user },
        { $set: { ratings: ratingDict }},
        function (err, count)  { if (err) throw err; }
    );
}

const addRatingHandler = catchWrap(async (req, res, next) => {
    const { itemID, newRating, user } = req.body;
    await addRating(itemID, newRating, user);
    res.status(200).send("Rating added successfully");
  });

export {addStar, removeStar, addComment, addRating, 
        addStarHandler, removeStarHandler, addCommentHandler, addRatingHandler};
