//Meant to be called after a user is finished with a recipe and leaves a review
//const mongoose = require("mongoose");
import User from '../models/userModel.js';
const {Recipe, Recommended} = require('../separate/recipeSchema.js');
//const connectDB = require('../connectDb.js');
import { catchWrap } from "../middleware/errorHandler.js";


async function recipeRecommender(selectedUsername)
{
    await Recommended.deleteMany({})
        .then(() => console.log('Existing recipes cleared'))
        .catch(error => console.error(error));
    await Recipe.aggregate([{ $sample: { size: 25 } }, { $limit: 50 }], (function(err, docs) {
        if (err) throw err;
        for (let i = 0; i < docs.length; i++) {
            const newRecipe = {
                id: docs[i].id,
                ingredients: docs[i].ingredients,
                url: docs[i].url,
                title: docs[i].title,
                instructions: docs[i].instructions,
                image: docs[i].image,
                rating: docs[i].rating,
                comments: docs[i].comments,
                favorites: docs[i].favorites,
                score: 0
            };
            Recommended.create(newRecipe, function(err, res) {
                if (err) throw err;
            });
        }
    }));
    const countf = await Recommended.countDocuments({});
    console.log(countf);

    const count = await User.findOne({username: selectedUsername}).exec();
    if (!count) {
        throw new Error("User not found");
    }
    for (let i = 0; i < count.ingredients.length; i++) {
        await addScore(count.ingredients[i])
    }
    await Recommended.deleteMany({ score: { $lt: 0 } });
    const sortedRecipes = await Recommended.find().sort({ score: -1 }).exec();
    console.log(sortedRecipes.length);
    return sortedRecipes;
}

async function addScore(ingredient)
{
    const regex = new RegExp(ingredient.name, 'i');
    const matches = await Recommended.find({"ingredients.text": regex}).exec();
    matches.forEach(match =>
    {
        Recommended.findOneAndUpdate(
            { id: match.id },
            { $inc: { score: ingredient.rating } },
            { new: true }, 
            function (err, count) 
            { if (err) throw err; }
        );
    });
}

const recommendHandler = catchWrap(async (req, res, next) => {
    const { selectedUsername } = req.body;
    res.status(200).json(await recipeRecommender(selectedUsername));
});

export { recipeRecommender, recommendHandler };