module.exports = {
  entry: {
    path: __dirname + "/src"
  },
  output: {
      path: __dirname + "/lib",
      filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|lib)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }  
      }
    ]
  }
}
