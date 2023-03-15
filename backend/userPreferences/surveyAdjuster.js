//Function meant to be called only once when after the user completes the initial survey
//const mongoose = require("mongoose");
import { User} from '../models/userModel.js';
//const connectDB = require('../connectDb.js');
import { catchWrap } from "../middleware/errorHandler.js";


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


const surveyHandler = catchWrap(async (req, res, next) => {
    const { selectedUsername, sets } = req.body;
    await surveyAdjuster(selectedUsername, sets);
    res.status(200).send("Received survey data");
});


export { surveyAdjuster, surveyHandler };