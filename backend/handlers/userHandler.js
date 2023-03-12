import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { catchWrap, setError } from "../middleware/errorHandler";

const getUser = catchWrap(
  async (req, res, next) => {
    if (req.user) {
      res.status(200).json(req.user);
      return;
    }
    const reqUsername = req.params.userId;
    if (reqUsername) {
      const foundUser = await User.findOne({ username: reqUsername }).exec();
      res.status(200).json(foundUser);
    } else {
      throw new Error();
    }
  },
  401,
  "Login to access profile"
);
const setUser = catchWrap(async (req, res, next) => {
  const { username, password } = req.body;
  const newUser = new User({
    username: username,
    password: password,
  });
  await newUser.save();
  res.status(200).json({
    message: "Success",
    user: newUser,
  });
});
const auth = catchWrap(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    setError(401, "Log in to access this page", res, next);
    return;
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);
  next();
});
const sendToken = (user, status, res) => {
  res.status(status).cookie("token", user.generateJWT(), {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};
const login = catchWrap(
  async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username }).exec();
    if (user.password === password) {
      sendToken(user, 200, res);
      res.json({
        message: "Login successful",
        user: user,
      });
    } else {
      throw new Error();
    }
  },
  401,
  "Incorrect username or password"
);
const logout = async (req, res, next) => {
  res.status(200).clearCookie("token").end();
};

export { getUser, setUser, auth, login, logout };
