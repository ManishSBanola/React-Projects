const HtmlWebpackPlugin = require("html-webpack-plugin");
console.log(__dirname);
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
module.exports = {
  node: {
    __dirname: false
  },
  devtool: "cheap-module-source-map",
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: "imports-loader?jQuery=jquery"
      },
      { test: /\.ejs$/, use: [{ loader: "ejs-loader?variable=data" }] },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader" // inject CSS to page
          },
          {
            loader: "css-loader" // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/index.html"
    }),

    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    })
  ]
};
