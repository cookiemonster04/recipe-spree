import path from "path";
import express from "express";
import connectDB from "./connectDb.js";
import { getRecipe } from "./handlers/recipeHandler.js";
import { getUser, setUser } from "./handlers/userHandler.js";
import errorHandler from "./middleware/errorHandler.js";
connectDB();

const app = express();
const CWD = process.cwd();
app.use(express.json());
app.use("/dev", express.static(path.join(CWD, "dev")));
app.use("/frontend", express.static(path.join(CWD, "frontend")));

app.get("/api/recipe/:recipeId", getRecipe);

app.post("/api/user", setUser);
app.get("/api/user/:userId", getUser);
app.use("/api/user", errorHandler);

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
