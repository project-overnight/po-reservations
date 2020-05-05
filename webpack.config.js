const path = require('path');
require('dotenv').config();
// const webpack = require('webpack');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFileName: devMode ? '[id].css' : '[name].[hash].css',
    }),
  ],
  mode: "development",
  entry: path.join(__dirname, "client", "Reservation.jsx"),
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "client")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-react",
            "@babel/preset-env",
            "airbnb"
          ],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssNormalize()
              ],
            },
          },
          // 'style-loader',
        ],
      }
    ],
  },
  // devServer: {
  //   contentBase: path.join(__dirname, "public/"),
  //   port: 3000,
  //   publicPath: "http://localhost:9001/",
  //   hotOnly: true
  // },
  devtool: "inline-source-map",
  watch: true,
  // externals: {
  //   react: 'react'
  // }
};
