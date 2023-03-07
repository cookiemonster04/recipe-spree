const mongoose = require("mongoose");
const User = require('../models/userModel.js');
const connectDB = require('../connectDb.js');

connectDB();
User.find({username: "addfasdfsa"}, function (err, count) 
{
    if (err) throw err;
    console.log(JSON.stringify(count, "", 2));
    mongoose.connection.close();
    console.log("closed");
});