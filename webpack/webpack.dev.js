const merge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    host: 'localhost',
    port: 9002,
    stats: 'minimal',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new DashboardPlugin(),
  ],
});
