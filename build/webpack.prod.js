const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  // 默认模式production  开发模式development
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        // loader的执行顺序是从右往左
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // 开启cssmodule
              // modules: true
              //  localIdentName: '[local]_[hash:base64:5]'
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // css代码分离
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
  ],
  // splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     automaticNameMaxLength: 30,
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  optimization: {
    // 代码分割  webpack自带懒加载的特性 线上环境需要代码分割
    splitChunks: {
      chunks: 'all', // 同时处理同步和异步引入的模块
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors[contenthash].js',
        },
      },
    },

    // css代码进行压缩
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    // 根据文件内容的变更生成hash值
    filename: '[name][contenthash].js',
    chunkFilename: '[name][contenthash].js',
  },
};

module.exports = merge(baseConfig, prodConfig);
