module.exports = {

  context: __dirname + '/src',
  resolve: {
    root: [__dirname + "/src"]
  },

  entry: './angular-ddp.js',

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel"}
    ]
  }
};
