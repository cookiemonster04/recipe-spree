const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

const uri = "mongodb+srv://AlexanderThaik:recipe@recipedb.0urkst5.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const connectDB = async ()=>{

    try{
        const conn = await mongoose.connect(uri,{
            //must add in order to not get any error masseges:
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `)
    }catch(error){
        console.error(`Error: ${error} `)
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}

connectDB();
/*
async function connect()
{
  try 
  {
    await mongoose.connect(uri,{ useNewUrlParser: true });
    console.log("Connected to MongoDB");
  } 
  catch (error) 
  {
    console.error(error);
  }
}

connect(); 
*/
app.listen(8000, () => {
    console.log("Server started on port 8000");
});