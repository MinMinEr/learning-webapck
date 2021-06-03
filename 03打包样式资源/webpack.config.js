/**
 * webpack配置文件
 *   作用： 指示webpack干哪些活（当运行webpack指令时，会加载里面的配置）
 *   所有构建工具都是给予nodejs平台进行的～默认采用commonjs
 *   src是写业务的文件
 */

// 用来拼接绝对路径
const {resolve} = require('path')
module.exports = {
    // 入口起点，指示
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'built.js',
        // __dirname代表当前文件目录的绝对路径
        path: resolve(__dirname,'build')
    },
    // loader配置
    module: {
        // 不同文件必须配置不同loader处理
        rules: [
            {
                test: /\.css$/,
                // 使用哪些loader
                use: [
                    // use数组中执行顺序，从下到上，依次执行
                    // 创建style标签，将js的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs的模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                // 使用哪些loader
                use: [
                    // use数组中执行顺序，从下到上，依次执行
                    // 创建style标签，将js的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs的模块加载到js中，里面内容是样式字符串
                    'css-loader',
                    // 将less文件编译成css文件
                    // 下载less 和less-loader
                    'less-loader'
                ]
            }
        ]
    },
    // 插件配置
    plugins: [
        
    ],
    // 模式
    mode: 'development' // development 或 productioon
}