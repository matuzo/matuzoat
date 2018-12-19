// const common = require('./webpack.common.js');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// module.exports = merge(common, {
//   module: {
//     rules: [
//       { test: /.(svg)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader' },
//       {
//         test: /\.scss$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             {
//               loader: 'css-loader', 
//               options: {
//                 minimize: true
//               }
//             },
//             {
//               loader: 'sass-loader'
//             }
//           ],
//           fallback: 'style-loader'
//         })
//       }
//     ]
//   },
//   plugins: [
//     new UglifyJSPlugin({
//       sourceMap: false
//     })
//   ] 
// });
