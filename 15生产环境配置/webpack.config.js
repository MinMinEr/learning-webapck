// css（less）、js、html、图片

const { resolve } = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpaackPlugin = require('optimize-css-assets-webpaack-plugin');
// 定义nodejs 的环境变量
process.env.NODE_ENV = 'production'
const commonCssLoader = [
    // 单独拉出
    MiniCssExtractPlugin.loader,
    'css-loader',
    // 兼容性，要配置browserslist
    {
        loader: 'postcss-loader',
        plugins: () => {
            require('postcss-preset-env')()
        }
    }
]
 /**
  * 若一个文件被多个loader，默认同时执行。用enforce来控制 顺序是先eslint，再执行babel
  * mo
  */
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
                    ...commonCssLoader
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoader,
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // eslint-loader优先执行
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [

                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: { version: 3 },
                            target: {
                                chrome: '60',
                                firefox: '50'
                            }
                        }
                    ]
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    'url-loader'
                ],
                options: {
                    limit: 8 * 1024,
                    name: '[hash10].[ext]',
                    outputPath: 'imgs',
                    esModule: false
                }
            },
            {
                test: /\.html$/,
                // commonjs,图片 esModule: false
                loader: 'html-loader'
            },
            {
                test: /\.html$/,
                exclude:/\.(js|css|less|html|jpg|png|gif)/,
                // commonjs,图片 esModule: false
                loader: 'file-loader',
                options: {
                    outputPath:'media'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // 压缩
        new OptimizeCssAssetsWebpaackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            removeComments: true，
        })
    ],
    // 资源进行压缩
    mode: 'production'
}