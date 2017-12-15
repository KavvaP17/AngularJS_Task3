var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

  var config = {};

  config.entry = { app: './src/app/app.js'};

  config.output = {
    path: __dirname + '/dist',
    publicPath: isProd ? './' : 'http://localhost:8080/',
    filename: isProd ? './js/[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  if (isProd) {
    config.devtool = 'source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }


  config.module = {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {loader: 'css-loader', query: {sourceMap: true}}
        ],
      })
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };

  config.plugins = [];
  config.plugins.push(
      new HtmlWebpackPlugin({
          template: './src/app/index.html',
          inject: 'body'
      }),
      new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
  )

  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{
          from: __dirname + '/src/public'
        }
      ])
    )
  }


  config.devServer = {
    contentBase: './src/public'
  };

  return config;
}();
