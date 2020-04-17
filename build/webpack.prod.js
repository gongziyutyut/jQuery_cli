const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const base = require('./webpack.base');

module.exports = merge({
    mode: 'production',
    output: {
        filename: 'js/[name]_[contenthash].js',  // 入口和内容hash组成的文件名，也可以是hash
		chunkFilename: 'js/[name]_[contenthash].chunk.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'css/[name]_[hash].css',
          chunkFilename: 'css/[name]_[hash].chunk.css',
      }),
      new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [  // loader解析的顺序是从下到上，从右到左的顺序
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            filename: '[name].css',
                            chunkFilename: '[name].css',
                           // publicPath: '../'   //****最后打包的时候替换引入文件路径
                        },
                    },
                    // 'style-loader',  使用MiniCssExtractPlugin时就不能使用style-loader了
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2   //该方式可以让@import引入的css文件再次执行一边css打包loader
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
}, base)

