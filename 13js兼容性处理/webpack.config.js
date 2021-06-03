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
       * js兼容性处理：babel-loader @babel/preset @babel/core-env
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设： 只是babel做怎木样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                // 指定兼容性具体做到哪个版本
                targets: {
                  chrome: '60',
                  ie: '9',
                  firefox: '60',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ],
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