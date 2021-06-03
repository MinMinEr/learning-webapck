const HtmlWebpackPlugin = require("html-webpack-plugin");
const {resolve} = require('path')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname,'build')
  },
  module: {
    rules: [
      /**
       * 语法检查
       *   规范js代码风格、检查常见的语法错误，让代码不容易出问题
       *   常用工具为eslint
       *   下载eslint-loader eslint
       *    只检查用户写的源码，第三方库不检查
       *   设置检查规则：在package.json中设置
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        }
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