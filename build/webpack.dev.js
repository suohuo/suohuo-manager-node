const Webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  // 默认模式production  开发模式development
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //     overlay: true,
  //     contentBase: '../dist',
  //     open: true,
  //     port: 9000,
  //     hot: true,
  //     hotOnly: true
  // },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // loader的执行顺序是从右往左
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // 开启cssmodule
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        // loader的执行顺序是从右往左
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
};

module.exports = merge(baseConfig, devConfig);
