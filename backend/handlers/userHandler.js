import path from "path";
import User from "../models/userModel";
const CWD = process.cwd();
const getUser = async (req, res, next) => {
  try {
    const reqUsername = req.params.userId;
    const foundUser = await User.findOne({ username: reqUsername }).exec();
    res.status(200).json(foundUser);
  } catch (error) {
    res.locals.error = error;
    next();
  }
};
const setUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({
      username: username,
      password: password,
    });
    await newUser.save();
    res.status(200).send("Success");
  } catch (error) {
    res.locals.error = error;
    next();
    // res.status(400).send(error.message);
  }
};

export { getUser, setUser };
