const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base')

module.exports = merge({
  mode: "development",
  output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
  module: {
    rules: [
      // 加载css，先处理加载问题，再解决预处理
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    port: '8081',
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true, // 解决单页面路由问题，
    contentBase: '../dist',
    open: true,  //自动打开浏览器
    hot: true,  // 开启热替换, css代码跟新不刷新页面
    // hotOnly: true 开启后只有手动配置才能更新，即使hot为true也不刷新浏览器
    proxy: {
      index: '', // 将index设置为空，可以对根路径进行转发
      'api/get': 'xxxx.com/api', // 第一种方式，直接代理到api路径
      'api/vue': {  // 第二种方式，在路径需要临时替换时使用
        target: 'xxxx.com/api',
        pathRewrite: {
            'head': 'demo'  //此时访问head路径将被代理到demo下
        },
        secure: false,  //对https请求的配置，false为支持https
        changeOrigin: true  //做代理分发时允许访问其他网站，突破网站限制，建议在开发环境使用
      },
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
	}
}, base)