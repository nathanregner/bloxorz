const merge = require('webpack-merge');
const common = require('./webpack.common');

const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devServer: {
    contentBase: './dist',
    stats: 'minimal',
  },
  plugins: [
    new CleanTerminalPlugin({
      message: { toString: () => new Date().toLocaleTimeString() },
    }),
  ],
});
