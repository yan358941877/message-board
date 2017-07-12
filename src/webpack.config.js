const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'js/app/index.js'),
  output: {
    path: path.join(__dirname, '../public/messageboard/'),
    filename: 'js/index.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        use:ExtractTextPlugin.extract({
          use: ['css-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jpg|png)$/,
        use: ['url-loader?name=images/[name].[ext]&limit=10240']
      },
      {
        test: /\.(eot|svg|ttf|wooff2?)$/,
        use: ['file-loader?name=fonts/[name].[ext]']
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ExtractTextPlugin('css/[name].css')
  ]
}