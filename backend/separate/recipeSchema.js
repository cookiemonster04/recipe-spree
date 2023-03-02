const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subtextSchema = new mongoose.Schema({
    text: 
    {
        type: String,
        required: true
    }
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
    rating:
    {
        type: Number,
        required: false
    },
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
/*
const recommendedSchema = new mongoose.Schema({
    id: 
    {
        type: String,
        required: true
    },
    score:
    {
        type: Number,
        required: true
    }
});*/
const Recipe = mongoose.model('Recipe', recipeSchema);
const Recommended = mongoose.model('Recommended', recipeSchema);
module.exports = {Recipe, Recommended};
