import User from '../models/userModel.js';
// const connectDB = require('../connectDb.js');
import { catchWrap } from "../middleware/errorHandler.js";

// connectDB();
// recentRecipe("aaa", "l");

async function recentRecipe(selectedUsername, recipeId)
{
    console.log("adding " + recipeId + " for user " + selectedUsername);
    const user = await User.findOne({ username: selectedUsername });
    let recentlyViewed = user.recentlyViewed;
    if (recentlyViewed.includes(recipeId)) {
        console.log("Recipe is already in list");
        recentlyViewed = recentlyViewed.filter(item => item !== recipeId);
    }
    recentlyViewed.reverse();
    recentlyViewed.push(recipeId);
    if (recentlyViewed.length > 10) {
        recentlyViewed.shift();
    }
    recentlyViewed.reverse();
    await User.findOneAndUpdate(
        { username: selectedUsername },
        { $set: { recentlyViewed: recentlyViewed } }
    );
}

async function removeRecentRecipe(username, recipeId)
{
    const user = await user.findOne({ username: username });
    const recentlyViewed = user.recentlyViewed;
    if (!recentlyViewed.includes(recipeId)) {
        console.log("Recipe not in list");
        return;
    }
    recentlyViewed = recentlyViewed.filter(item => item !== recipeId);
    await User.findOneAndUpdate(
        { username: username },
        { $set: { recentlyViewed: recentlyViewed } }
    );
}

const recentHandler = catchWrap(async (req, res, next) => {
    // const { selectedUsername, recipeId } = { ,  };
    res.status(200).json(await recentRecipe(req.body.userId, req.body.recipeId));
});

export { recentRecipe, recentHandler, removeRecentRecipe };