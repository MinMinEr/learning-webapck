const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// process.env.NODE_ENV = 'development';

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,// 取代style loader，提取js中的样式成为单独css文件
                    'css-loader'
                    /**
                     * css兼容性处理：postcss-->postcss-loader postcss-preset-env
                       帮助postcss找到 package 中browerlist的配置，通过配置加载制定的css兼容性样式
                     */
                    // 修改loader配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')
                            ]
                        }
                    }
                ],
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
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        })
    ],
    mode: 'development',
    // 开发服务器devserver，自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点： 只会在内存中编译打包，不会有任何输出
    // 启动devserve指令为： webpack-dev-server

    // "browerslist": {
    //     "development": [
    //       "last 1 chrome version",
    //       "last 1 firefox version",
    //       "last 1 safari version",
    //     ],
    //     "production": [
    //       ">0.2%",
    //       "not dead",
    //       "not op_mini all"
    //     ]
    //   }

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