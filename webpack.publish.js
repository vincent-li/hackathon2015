var webpack = require('webpack');
var webpackConfig = require('./webpack.local');
webpackConfig.plugins = [
    // 生产环境配置
    new webpack.DefinePlugin({
      __LOCAL__: false, // 本地环境 不要改动
      __DEV__:   false, // 日常环境 不要改动
      __PRO__:   true   // 生产环境 不要改动
    })
];
module.exports = webpackConfig;