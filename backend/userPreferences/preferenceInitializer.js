//const mongoose = require("mongoose");
import  User from '../models/userModel';
import { catchWrap } from "../middleware/errorHandler.js";
//const connectDB = require('../connectDb.js');

async function initializeUser(newUsername) 
{
    const initialList = [
        "brocolli", "butter", "chicken", "spinach", "egg", "rice", "pork", "beef",
        "cheese", "garlic", "orange", "turkey", "tomato", "potato", "milk", "pasta",
        "onion", "corn", "olive", "tuna", "lentils", "chile", "broth", "bacon",
        "mushroom", "coconut", "beet", "strawberry", "peanut", "yogurt"
    ];
    initialList.forEach(element =>
        {
            User.findOneAndUpdate(
                { username: newUsername },
                { $push: { ingredients: {name: element, rating: 0} } },
                { new: true }, 
                function (err, count) 
                { if (err) throw err; }
            );
        });
    User.findOneAndUpdate(
        { username: newUsername },
        { $set: { numRecipes: 0 } },
        { new: true }, 
        function (err, count) 
        { if (err) throw err; }
    );
}

const initializeHandler = catchWrap(async (req, res, next) => {
    const { newUsername } = req.body;
    await initializeUser(newUsername);
    res.status(200).send("User initialized successfully");
});


export { initializeUser, initializeHandler };