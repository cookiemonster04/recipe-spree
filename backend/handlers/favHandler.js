import User from "../models/userModel";
import { catchWrap, setError } from "../middleware/errorHandler";

const getFav = catchWrap(async (req, res, next) => {
  console.log("getFav");
  if (!req.user && !req.params.userId) {
    setError(400, "Invalid query", res, next);
  }
  const queryId = req.params.userId ?? req.user._id;
  const favs = await User.findById(queryId).select("favorites");
  res.status(200).json(favs);
});

const testFav = catchWrap(async (req, res, next) => {
  console.log("testFav");
  if (!req.user) {
    setError(400, "req.user not found", res, next);
  }
  if (!req.params.recipeId) {
    res.status(400).send("Invalid request");
  }
  const hasFav = await User.exists({
    _id: req.user._id,
    favorites: { $elemMatch: { $eq: req.params.recipeId } },
  });
  console.log(hasFav);
  res.status(200).json({ found: hasFav !== null });
});

const modifyFav = catchWrap(async (req, res, next) => {
  console.log("modifyFav");
  if (!req.user) {
    setError(400, "req.user not found", res, next);
  }
  const { recipeId, insert } = req.body;
  if (insert) {
    const db_res = await User.updateOne(
      { _id: req.user._id },
      { $addToSet: { favorites: recipeId } }
    );
    console.log(db_res);
    res.status(201).json(db_res);
  } else {
    const db_res = await User.updateOne(
      { _id: req.user._id },
      { $pull: { favorites: recipeId } }
    );
    console.log(db_res);
    res.status(200).json(db_res);
  }
});

export { getFav, testFav, modifyFav };
