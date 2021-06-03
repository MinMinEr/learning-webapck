const { resolve } = require("path");
const HtmlWebpackPlugin= require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },

            {
                // 需要下载url-loader 和 file-loader
                test: /\.(jpeg|jpg|png|gif)$/,
                // 使用一个loader
                loader: 'url-loader',
                options: {
                    // 图片小于8Kb，会base64处理
                    // 优点： 减少请求数量（减轻服务器压力）
                    // 缺点： 图片提及会更大。原本10kb，base64后13kb，倒是文件请求速度变慢
                    // 一般只对小图片进行base64处理
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出现问题：【object module】
                    // 解决： 关闭es6模块化
                    esModule: false,
                    name:'[hash:6].[ext]'

                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}