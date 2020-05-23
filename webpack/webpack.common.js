const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlSource = require("./html");
const Webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const htmls = htmlSource.map(html => {
  return new HtmlWebpackPlugin({
    template: Path.resolve(__dirname, `../src/${html}.html`),
    filename: `${html}.html`,
    minify: false,
    hash: true
  });
});

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../src/scripts/main.js")
  },
  output: {
    path: Path.join(__dirname, "../build")
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new Webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, "../public"), to: "build/public" }
    ]),
    ...htmls
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src"),
      "@autoload": Path.resolve(__dirname, "../src/scripts/autoload"),
      "@blocks": Path.resolve(__dirname, "../src/scripts/blocks"),
      "@components": Path.resolve(__dirname, "../src/scripts/components"),
      "@constants": Path.resolve(__dirname, "../src/scripts/constants"),
      "@controllers": Path.resolve(__dirname, "../src/scripts/controllers"),
      "@filters": Path.resolve(__dirname, "../src/scripts/filters"),
      "@lib": Path.resolve(__dirname, "../src/scripts/lib"),
      "@routes": Path.resolve(__dirname, "../src/scripts/routes"),
      "@services": Path.resolve(__dirname, "../src/scripts/services"),
      "@stores": Path.resolve(__dirname, "../src/scripts/stores"),
      "@util": Path.resolve(__dirname, "../src/scripts/util"),
      "@ws": Path.resolve(__dirname, "../src/scripts/ws")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
        }]
      }
    ]
  }
};
