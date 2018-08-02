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
  }
};

let nodeCfg = Object.assign({}, baseCfg, {
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.common.js',
    libraryTarget: 'commonjs',
    library: 'SearchClient',
    umdNamedDefine: true
  }
});

let browserCfg = Object.assign({}, baseCfg, {
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.min.js',
    libraryTarget: 'var',
    library: 'SearchClient',
    umdNamedDefine: true
  }
});

module.exports = [browserCfg, nodeCfg];