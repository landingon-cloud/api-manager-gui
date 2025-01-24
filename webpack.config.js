const HtmlWebPackPlugin = require("html-webpack-plugin");

const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const webpack = require('webpack');
const defineEnvPlugin = new webpack.DefinePlugin({
    'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
    'process.env.API_BASE': JSON.stringify(process.env.API_BASE),
    'process.env.API_AUTH': JSON.stringify(process.env.API_AUTH),
    'process.env.BASE_REALURL': JSON.stringify(process.env.BASE_REALURL),
    //    'process.env': JSON.stringify(process.env)
});

const interpolate = new InterpolateHtmlPlugin({
    'PUBLIC_URL': process.env.PUBLIC_URL.toString()
})

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const path = require('path')

module.exports = {
  output: {
    path: path.resolve('build'),
    filename: 'index.bundle.js'
  },
  devServer: {
      historyApiFallback: true,
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=1000000'
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin, defineEnvPlugin, interpolate]
};
