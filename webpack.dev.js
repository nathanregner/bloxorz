const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devServer: {
    contentBase: './dist',
    stats: 'minimal',
  },
});
