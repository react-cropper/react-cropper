var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/index.jsx',
  output: {
    path: 'assets',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    }),
    new ExtractTextPlugin('bundle.css')
  ]
};