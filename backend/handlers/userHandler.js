import path from "path";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { setError } from "../middleware/errorHandler";

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
const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    setError(401, "Log in to access this page", res, next);
    return;
  }
  const jwtid = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(jwtid);
  next();
};
const sendToken = (user, status, res) => {
  res.status(status).cookie("token", user.generateJWT(), {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};
const login = async (req, res, next) => {
  const { username, password } = req.body;
  const fail_msg = "Incorrect username or password";
  const user = await User.findOne({ username: username })
    .exec()
    .catch(setError(401, fail_msg, res, next));
  if (user.password === password) {
    sendToken(user, 200, res);
    res.send("Login successful");
  } else {
    setError(401, fail_msg, res, next);
  }
};
const logout = async (req, res, next) => {
  res.status(200).cookie("token", null);
};

export { getUser, setUser, auth, login, logout };
