const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
  // publicPath: '/dist/',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      component: path.resolve(__dirname, 'src/utilities/'),
      template: path.resolve(__dirname, 'src/templates/'),
    },
  },
  // stats: 'errors-only',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        //   'eslint-loader'
      ],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'imgs/',
          limit: 1024 * 5,
        },
      },
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
      },
    },
    ],
  },
  // 除掉警告信息
  performance: false,
  // tree sharking
  optimization: {
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    // shimming
    new Webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ],
};
