const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
    // 开发模式使用，方便查错误
    devtool: "inline-source-map",
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "index.ts")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/build.js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8111,
        compress: true, //压缩
        open: true, //自动打开浏览器
    },
    // 用来设置引用模块
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        /**
         * loader 是从右到左执行，顺序不能颠倒
         * 1. 最先执行 sass-loader ，将 sass 文件转为css
         * 2. css-loader 将转换后的css文件转为 js模块
         * 3. style-loader 将 css 插入到HTML中的<style>标签中
         */
        rules: [
            {
                test:/\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test:/\.ts$/,
                loader:"ts-loader",
                exclude: /(node_modules|bower_components)/,
            },
            {
                oneOf:[
                    {
                        test: /\.(css|scss)$/,
                        use: [
                            MiniCssExtractPlugin.loader,"css-loader","sass-loader"
                        ]
                    },
                    //图片处理
                    {
                        test:/\.(png|jpg|gif|jpeg)$/,
                        loader:"url-laoder",
                        options:{
                            output:"static/images",
                            esModle:false
                        }
                    },
                    // {
                    //     test: /\.html$/i,
                    //     loader: 'html-loader',
                    //     options:{
                    //         esModle:false
                    //     }
                    // },
                    {
                        test: /\.(woff|woff2|ttf)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/iconfont',
                            publicPath: '../iconfont'
                        },
                        exclude: /\.(css|html|png|jpg|gif|jpeg)/
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'statics/css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
            title: "Split",
            chunks: ['index'],
            minify: {
                removeTagWhitespace: true,
                collapseWhitespace: true
            }
        })
    ]
}