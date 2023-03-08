//Function meant to be called only once when after the user completes the initial survey
const mongoose = require("mongoose");
const User = require('../models/userModel.js');
const connectDB = require('../connectDb.js');

const love = ["brocolli", "butter", "chicken", "spinach", "egg", "rice", "pork", "beef"];
const like = ["cheese", "garlic", "orange", "turkey", "tomato", "potato", "milk", "pasta"];
const dislike = ["onion", "corn", "olive", "tuna", "lentils", "chile", "broth", "bacon"];
const blacklisted = ["mushroom", "coconut", "beet", "strawberry", "peanut", "yogurt"];

const sets = [love, like, dislike, blacklisted];

connectDB();
surveyAdjuster("aaa", sets);

async function surveyAdjuster(selectedUsername, sets) 
{
    sets.forEach(set =>
        {
            set.forEach(element =>
                {
                    let score;
                    switch (set)
                    {
                        case love: score = 8; break;
                        case like: score = 5; break;
                        case dislike: score = -5; break;
                        case blacklisted: 
                            score = -9999; 
                            User.findOneAndUpdate(
                                { username: selectedUsername },
                                { $push: { blacklistedIngredients: {name: element} } },
                                { new: true }, 
                                function (err, count) 
                                { if (err) throw err; }
                            );
                            break;
                        default: score = 0;
                    }
                    User.findOneAndUpdate(
                        { username: selectedUsername, "ingredients.name": element },
                        { $set: { "ingredients.$.rating": score } },
                        { new: true }, 
                        function (err, count) 
                        { if (err) throw err; }
                    );
                });
        
        });
}

module.exports = surveyAdjuster;