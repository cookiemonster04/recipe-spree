const mongoose = require("mongoose");
import { User} from '../models/userModel.js';
const connectDB = require('../connectDb.js');

connectDB();
User.find({username: "aaa"}, function (err, count) 
{
    if (err) throw err;
    console.log(JSON.stringify(count, "", 2));
    mongoose.connection.close();
    console.log("closed");
});