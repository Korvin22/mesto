const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
entry: './src/pages/index.js',
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'main.js'
},
plugins: [
new HtmlWebpackPlugin({
  template:'./src/index.html'
}),
new MiniCssExtractPlugin(),
new CleanWebpackPlugin()
],
module: {
  rules: [
    {
      test: /\.(js)$/,
      use: 'babel-loader',
      exclude: '/node modules/'
    },
    {
      test: /\.(png|svg|jpg|jpng|gif)$/,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name].[hash][ext]'
      }
    },
    {
      test: /\.css$/,
      use:[MiniCssExtractPlugin.loader,
      {
        loader:'css-loader',
        options: {
          importLoaders: 1
        }
      },
    'postcss-loader']
    }
  ]
}
};
