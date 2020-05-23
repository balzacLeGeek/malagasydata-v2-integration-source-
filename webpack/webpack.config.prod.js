const Webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const publicPath = process.env.PUBLIC_PATH || "";

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  optimization: {
    moduleIds: "hashed",
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    filename: "build/js/[name].js",
    chunkFilename: "build/js/[name].chunk.js",
    publicPath
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.NormalModuleReplacementPlugin(/ws\.js/, "ws.production.js"),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "build/css/bundle.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
});
