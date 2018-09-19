const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
  },
};