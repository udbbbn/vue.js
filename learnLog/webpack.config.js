/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-01-07 14:59:46
 * @version $Id$
 */

const webpack = require('webpack');
// 分离css插件不支持热更新
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: __dirname + '/public/index.js'
    },
    output: {
        path: __dirname+ '/build',
        filename: '[name].bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build", //本地服务器加载的页面所在目录
        historyApiFallback: true, //不跳转
        inline: true // 实时刷新
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader")}
             {
            test: /\.css$/,
            use: [{
                loader: "style-loader" // style-loader用于将样式插入js代码
            }, {
                loader: "css-loader", // css-loader用于解析
                options: {
                    modules: true // 启动css模块规范
                }
            }]
        }
        ]
    },
    plugins: [
        // new ExtractTextPlugin("style.css")
        new webpack.HotModuleReplacementPlugin(),
        // 添加自动生成html插件
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.tmpl.html"
        })
    ]
}