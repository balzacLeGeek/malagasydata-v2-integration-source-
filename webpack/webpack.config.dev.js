const Path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    inline: true,
    hot: true
  },
  output: {
    filename: "build/js/[name].js",
    chunkFilename: "build/js/[name].[contenthash].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        loader: "babel-loader"
      },
      {
        test: /\.s?css$/i,
        use: [
          "style-loader",
          "css-loader?sourceMap=true",
          "postcss-loader?sourceMap=true",
          "sass-loader?sourceMap=true"
        ]
      }
    ]
  }
});
