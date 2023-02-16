const path = require("path");
const CWD = process.cwd();

const config = {
  name: "frontend",
  entry: [path.join(CWD, "./frontend/index.js")],
  output: {
    path: path.join(CWD, "dev"),
    filename: "frontend.generated.js",
    publicPath: "/dev/",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = config;
