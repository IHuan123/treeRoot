// webpack公共配置
const { resolve } = require("path")
const srcPath = resolve(__dirname, "../src")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    entry: {
        index: resolve(srcPath, "index.ts")
    },
    output: {
        path: resolve(__dirname, "../dist"),
        filename: "js/build.js"
    },
    // 用来设置引用模块
    resolve: {
        //可以不加后缀就可以引用
        extensions: [".ts", ".js"],
        //路由重命名
        alias: {
            "@": resolve(__dirname, "../src")
        }
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
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /(node_modules|bower_components)/,
            },
            {
                oneOf: [
                    {
                        test: /\.(css|scss)$/,
                        use: [
                            MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                        ]
                    },
                    //图片处理
                    {
                        test: /\.(png|jpg|gif|jpeg)$/,
                        loader: "url-loader",
                        options: {
                            limit: 8 * 1024,
                            outputPath: "static/images",
                            esModle: false
                        }
                    },
                    {
                        test: /\.(woff|woff2|ttf)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/iconfont',
                            publicPath: '../static/iconfont'
                        },
                        exclude: /\.(css|html|png|jpg|gif|jpeg)/
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.ico', '!lib/**'],//dist文件夹下的favicon.ico文件和lib文件夹下的东西都忽略不进行删除
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name][hash:4].css'
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "../public/index.html"),//指定html模板文件
            filename: "index.html",
            title: "plum",
            inject:"head",
            favicon: '', //指定网站图标
            chunks: ['index'],
            minify: {
                removeTagWhitespace: true,
                collapseWhitespace: true
            }
        })
    ]
}