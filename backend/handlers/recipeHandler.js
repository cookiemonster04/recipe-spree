import path from "path";
const CWD = process.cwd();
const retrieveRecipe = (req, res, next) => {
  const reqId = req.params.recipeId;
  console.log(`reqid: ${reqId}`);
  res.sendFile(path.join(CWD, `backend/separate/individual/${reqId}.json`));
};

export default retrieveRecipe;
