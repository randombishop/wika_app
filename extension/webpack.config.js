const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, './src/background/background_ext.js'),
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'background_ext.js',
  },
  optimization: {
    minimize: false
  }
}