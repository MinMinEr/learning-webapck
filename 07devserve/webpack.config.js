const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                // options: {
                //     outputPath: 'style'

                // }
                
            },
            // 打包其他资源（除了html/js/css以外的资源
            {
                exclude: /.(css|js|html)/,
                // 
                loader: 'file-loader',
                options: {
                    name: '[hash:5].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 开发服务器devserver，自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点： 只会在内存中编译打包，不会有任何输出
    // 启动devserve指令为： webpack-dev-server
    devServer: {
        // 要运行项目的目录，构建后的
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 开发服务器端口号
        port: 3008,
        // 自动打开浏览器
        open: true
    }
}