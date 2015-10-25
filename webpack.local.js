var webpack = require('webpack');
module.exports = {
    cache: false,
    entry: {
        app: './src/app/initialize'
    },
    output: {
        // 这个path配置和pipe.dest()冲突
        // 所以如果使用"gulp watch" 此行要注释掉
        // 如果使用"webpack --watch" 此行要打开
        // path: './dist', 
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'jsx-loader?harmony'}
        ]
    },
    plugins: [
        // 开发环境配置
        new webpack.DefinePlugin({
          __LOCAL__: true,  // 本地环境 按需修改
          __DEV__:   true,  // 日常环境 按需修改
          __PRO__:   false  // 生产环境 不要修改
        })
    ]
};