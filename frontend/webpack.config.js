/* eslint quotes: ["error", "double"] */
/* eslint comma-dangle: ["error", "never"] */

//------------------------
// Package Imports
//------------------------
const path = require("path");
const merge = require("webpack-merge");
const dotenv = require("dotenv");
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
//------------------------
// Path Finding
//------------------------
const nodeModules = path.resolve(__dirname, 'node_modules');
const bowerComponents = path.resolve(__dirname, 'bower_components');
//------------------------
// Env Variables
//------------------------
const envName = process.env.NODE_ENV == "production" ? "prod" : "dev";
const envPath = path.resolve(__dirname, `./frontend/${envName}.env`);
// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config({ path: envPath }).parsed;
let envKeys;
if (env != null) {
  // reduce it to a nice object, the same as before
  envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
}
const plugins = env == null ?
  [
    new CleanWebpackPlugin(["frontend/scaffold/bundle"]),
  ]
  :
  [
    new CleanWebpackPlugin(["scaffold/bundle"]),
    new webpack.DefinePlugin(envKeys)
  ];

//------------------------
// Common Configurations
//------------------------
const common = {
  entry: "./js/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [nodeModules, bowerComponents],
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: [{loader: 'svg-url-loader', options: {limit: 10000,},},
        ],
      },
      {
        test: /\.mp3$/,
        include: nodeModules,
        loader: 'file-loader'
      },
      {
        test: /\.png$/, 
        include: nodeModules,
        loader: 'file-loader?name=images/[name].[ext]'
      },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins: plugins,
  output: {
    path: path.resolve(__dirname, "/scaffold/bundle/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000, // use any port suitable for your configuration
    host: '0.0.0.0', // to accept connections from outside container
    // watchOptions: {
    //     aggregateTimeout: 500, // delay before reloading
    //     poll: 1000 // enable polling since fsevents are not supported in docker
    // }
    historyApiFallback: true
  }
};

//------------------------
// Prod vs Dev Config
//------------------------
switch (process.env.NODE_ENV) {
  case "production":
    module.exports = merge(common, {
      mode: "production",
      devtool: "source-map"
    });
    break;
  default:
    module.exports = merge(common, {
      mode: "development",
      devtool: "inline-source-map",
      devServer: {
        contentBase: path.join(__dirname, "/scaffold/"),
        port: 3000,
        hotOnly: true
      }
    });
    break;
}
