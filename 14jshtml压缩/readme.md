## js和html压缩

### 1.js压缩

webpack.config.js

```js
mode: 'production'
```

### 2.html压缩

```
plugins: [
    // 作用：创建空的html，引入打包输出的所有资源（js/css）
    new HtmlWebpackPlugin({
        // 需求： 需要有结构的html文件
        // 复制''./src/index.html',并自动引入打包输出的所有（js/css）
        template: './src/index.html',
        minify: {
            // 移除空格
            collapseWhitespace: true,
            // 清除注释
            removeComments: true
        }
    })

],
```

