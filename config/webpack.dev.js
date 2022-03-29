const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// const webpack = require('webpack');
module.exports = merge(common, {
    mode: 'development',
    devtool: "inline-source-map", //控制台提示信息映射
    devServer: { //开发服务器
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        port: 8111,
        proxy: { //反向代理，根据需求自行修改
           
        },
        open: true,  //自动打开浏览器
        compress: true, //压缩
        // hot: true, //让webpackDevServer开启热更新功能
        // hotOnly: true //当hot module replacement功能没生效时，也不允许浏览器重新加载
    },
    //如需热更新，开启下面代码
    //plugins: [
    //    new webpack.HotModuleReplacementPlugin()
    //]
});