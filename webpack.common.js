const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  // filename: '[name].[contenthash].css',
  allChunks: true
});

module.exports = {
  entry: ['./static/scripts/index.js', './static/styles/styles.scss'],
  output: {
    filename: '[name].js',
    // filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'static/min')
  },
  module: {
    rules: [
      // { test: /.(svg)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    //   {
    //     test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    //     use: [{
    //         loader: 'file-loader',
    //         options: {
    //             name: '[name].[ext]',
    //             outputPath: 'fonts/'
    //         }
    //     }]
    // }
    ]
  },
  plugins: [extractSass, new WebpackCleanupPlugin()]
  // plugins: [new WebpackCleanupPlugin()]
};
