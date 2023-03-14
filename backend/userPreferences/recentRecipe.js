const User = require('../models/userModel.js');
// const connectDB = require('../connectDb.js');
import { catchWrap } from "../middleware/errorHandler.js";

// connectDB();
// recentRecipe("aaa", "l");

async function recentRecipe(selectedUsername, recipeId)
{
    const user = await User.findOne({ username: selectedUsername });
    const recentlyViewed = user.recentlyViewed;
    if (recentlyViewed.includes(recipeId)) {
        console.log("Recipe is already in list");
        return;
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

const recentHandler = catchWrap(async (req, res, next) => {
    const { selectedUsername, recipeId } = req.body;
    res.status(200).json(await recentRecipe(selectedUsername, recipeId));
});

export { recentRecipe, recentHandler };