module.exports = {
  entry: './src/main.js',

  output: {
    filename: 'rest-reflux.js',
    path: './dist'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
