const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'react_src', 'index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {  
    path: path.resolve(__dirname, 'static', 'reactBundle'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
 },
 mode:'development',
 watch: true,
};
