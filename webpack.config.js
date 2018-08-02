const path = require('path');

let baseCfg = {
  entry: "./src/SearchClient.ts",
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [],
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        declaration: false,
      }
    }]
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.min.js',
    libraryTarget: 'umd',
    library: 'SearchClient',
    umdNamedDefine: true,
    globalObject: `typeof self !== 'undefined' ? self : this`
  }
};

module.exports = baseCfg;