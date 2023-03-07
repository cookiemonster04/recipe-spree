const mongoose = require("mongoose");
const User = require('../models/userModel.js');
const connectDB = require('../connectDb.js');

connectDB();
initializeUser("zjhdioz");

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
}

module.exports = initializeUser;