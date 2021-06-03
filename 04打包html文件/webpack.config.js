/**
 * loader: 1.下载；2.使用（配置loader）
 * plugin:1.下载 2.引用 3.使用
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: []
    },
    plugins: [
        // 作用：创建空的html，引入打包输出的所有资源（js/css）
        new HtmlWebpackPlugin({
            // 需求： 需要有结构的html文件
            // 复制''./src/index.html',并自动引入打包输出的所有（js/css）
            template: './src/index.html'
        })

    ],
    mode: 'development'
}