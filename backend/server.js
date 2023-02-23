import path from "path";
import express from "express";
import recipeHandler from "./handlers/recipeHandler.js";
import connectDB from "./connectDb.js";

connectDB();

const app = express();
const CWD = process.cwd();

app.use("/dev", express.static(path.join(CWD, "dev")));
app.use("/frontend", express.static(path.join(CWD, "frontend")));
app.get("/api/recipe/:recipeId", recipeHandler);
app.get("*", (req, res, next) => {
  console.log("Request received");
  res.sendFile(path.join(CWD, "index.html"));
});

let port = process.env.port || 8000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server running on port " + port);
});
