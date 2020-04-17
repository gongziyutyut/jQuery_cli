const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = path.resolve(__dirname, '../public/index.html')
const webpack = require('webpack')
module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    // __dirname 表示当前路径的绝对路径
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks :{
      chunks: 'all',
      // chunks: 'async', // async表示只对异步代码进行分割
      minSize: 30000,  // 当超过指定大小时做代码分割
      // maxSize: 200000,  // 当大于最大尺寸时对代码进行二次分割
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: {  // 缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10, // 权重越大，打包优先级越高
            // filename: 'js/vender.js'  //将代码打包成名为vender.js的文件
            name: 'vender'
        },
        default: {
            minChunks: 2,
            priority: -20,
            name: 'common',
            // filename: 'js/common.js',
            reuseExistingChunk: true // 是否复用已经打包过的代码
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader', // 与file-loader的功能类似，但是较为智能
          options: {
            // 配置打包后的文件名，可查看webpack中file-loader文档
            name: '[name].[ext]?[hash]',
            outputPath: 'imgs/', // 输出的文件路径
            limit: 4096 // 图片大小限制，超过4Kb则以文件形式存在，小于则以base64输出
          }
        }
      },
      // 关于引入的字体处理
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template,
      filename: 'index.html'
    })
  ]
}