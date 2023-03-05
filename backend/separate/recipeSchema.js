const mongoose = require("mongoose");

const subtextSchema = new mongoose.Schema({
    text: 
    {
        type: String,
        required: true
    }
});
const ratingSchema = new mongoose.Schema({
    stars:
    {
        type: Number,
        required: false
    },
    numRatings:
    {
        type: Number,
        required: false
    },
});
  
const recipeSchema = new mongoose.Schema({
    id: 
    {
        type: String,
        required: true
    },
    ingredients: [subtextSchema],
    url: 
    {
        type: String,
        required: true
    },
    title: 
    {
        type: String,
        required: true
    },
    instructions: [subtextSchema],
    image: 
    {
        type: String,
        required: false
    },
    rating: ratingSchema,
    comments: [subtextSchema],
    favorites:
    {
        type: Number,
        required: false
    },
    score:
    {
        type: Number,
        required: false
    }
});  
const Recipe = mongoose.model('Recipe', recipeSchema);
const Recommended = mongoose.model('Recommended', recipeSchema);
module.exports = {Recipe, Recommended};
