//Meant to be called after a user is finished with a recipe and leaves a review
//const mongoose = require("mongoose");
import { User} from '../models/userModel.js';
const {Recipe, Recommended} = require('../separate/recipeSchema.js');
import { catchWrap } from "../middleware/errorHandler.js";
//const connectDB = require('../connectDb.js');
//const { userInfo } = require("os");


//Score should be on a scale from 0 to 10
async function recipeAdjuster(selectedUsername, recipeId, score) 
{
    const user = await User.findOne({ username: selectedUsername });
    let ingredientsList = [];
    console.log(user.ingredients.length);
    for (const element of user.ingredients) {
        const regex = new RegExp(element.name, "i");
        const matches = await new Promise((resolve, reject) => {
            Recipe.findOne({ "ingredients.text": regex, id: recipeId }, function (err, matches) {
                if (err) return reject(err);
                if (matches)
                {
                    ingredientsList.push(element.name);
                }
                resolve(matches);
                })
            });
        };
    console.log(ingredientsList);
    ingredientsList.forEach(element =>
        {
            updateOrCreate(selectedUsername, element, score);
        });
    //Adds one to count of cooked recipes
    User.findOneAndUpdate(
        { username: selectedUsername},
        { $inc: { numRecipes: 1 } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err;}
    );
    User.findOne({ username: "aaa" }, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log(user);
        }
    });
}

async function updateOrCreate(selectedUsername, ingredient, score)
{
    //Scales score to -10 to 10
    score = score*2 - 10;
    let currentRating = 9999;
    //Checks if the ingredient is already in the user's profile
    await User.findOne({ username: selectedUsername, "ingredients.name": ingredient }, { "ingredients.$": 1 })
        .then(result => {
                const temp = result.ingredients[0];
                currentRating = temp.rating;
            }
        )
        .catch(error => {
            return;
        });
    const filter = {username: selectedUsername, 'ingredients.name': ingredient };
    const options = {new: true, upsert: true, runValidators: true};
    let update;
    //If ingredient doesn't exist, add it
    if (currentRating === 9999)
    {
        User.findOneAndUpdate(
            { username: selectedUsername },
            { $push: {ingredients: {name: ingredient, rating: await lerp(0, score, selectedUsername)}}},
            { new: true }, 
            function (err, count) 
            { if (err) throw err; }
        );
    }
    //If ingredient exists, change its value
    else
    {
        User.findOneAndUpdate(
            { username: selectedUsername, "ingredients.name": ingredient },
            { $set: {'ingredients.$.rating': await lerp(currentRating, score, selectedUsername)}},
            { new: true }, 
            function (err, count) 
            { if (err) throw err; }
        );
    }
}

async function lerp(oldRating, newRating, selectedUsername)
{
    //How much the user's preferences is changed is based on how many recipes they have already cooked
    //If they have cooked more meals, their preferences are affected less by what they think of the 
    //current recipe
    //Reasoning is that as the user cooks more, the algo should already know enough about them and
    //does not need to overcorrect itself
    await User.findOne({username: selectedUsername}, {numRecipes: 1})
        .then(result => {
            count = result.numRecipes;
        })
        .catch(error => {
            console.log(error);
        });
    const e = 2.7182;
    //Sigmoid function calculates the factor by which the preferences should change
    //Ranges from 50% to 5%
    const sigmoid = (0.95 - (0.9 / (1 + e**(-0.1 * count))));
    const rating = oldRating + (newRating - oldRating) * 0.1;
    return rating;
}


const adjusterHandler = catchWrap(async (req, res, next) => {
    const { selectedUsername, ingredientsList, score } = req.body;
    await recipeAdjuster(selectedUsername, ingredientsList, score);
    res.status(200).send("Ratings adjusted successfully");
});

export { recipeAdjuster, adjusterHandler };