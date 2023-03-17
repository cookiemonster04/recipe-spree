import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const model_name = "User";

const passwordCheck = (password) => {
  const errors = [];
  if (password === "") {
    errors.push("Please specify a password");
    return errors;
  }
  if (password.length <= 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (password.length > 30) {
    errors.push("Password cannot be longer than 30 characters");
  }
  if (password.search(/[A-Z]/) == -1) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (password.search(/[a-z]/) == -1) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (password.search(/[0-9]/) == -1) {
    errors.push("Password must contain at least one digit");
  }
  if (password.search(/[@$!%*#?&]/) == -1) {
    errors.push("Password must contain at least one special character");
  }
  return errors;
};

const messageGenerator = (errors) => {
  if (errors.length === 0) {
    return "Success";
  } else {
    return errors.join("\n");
  }
};

const subtextSchema = new mongoose.Schema({
  text: 
  {
    type: String,
    required: true
  },
  recipeTitle:
  {
    type: String,
    required: true
  }
});

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  }
});

const userRatingSchema = new Schema({
  recipeId: {
    type: Number,
    required: true
  },
  rating: {
    type: String,
    required: true
  }
})

const userSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator: async (value) => {
        if (value === "") {
          return false;
        }
        const queryResult = await mongoose
          .model(model_name)
          .exists({ username: value });
        return !queryResult;
      },
      message: (props) => {
        return props.value === ""
          ? "Please specify a username"
          : "Username is taken";
      },
    },
    unique: true,
    maxLength: [25, "Username cannot be longer than 25 characters"],
  },
  password: {
    type: String, // should be hashed
    validate: {
      validator: (value) => passwordCheck(value).length === 0,
      message: (props) => messageGenerator(passwordCheck(props.value)),
    },
  },
  first: String,
  last: String,
  postIds: [String],
  favorites: [String],
  recentlyViewed: [String],
  comments: [subtextSchema],
  numRecipes: {
    type: Number,
    default: 0
  },
  ingredients: [ingredientSchema],
  blacklistedIngredients: [ingredientSchema],
  ratings: {
    type: Map,
    of: String,
    default: new Map()
  },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model(model_name, userSchema);
export default User;
