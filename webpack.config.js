var path = require('path');
var webpack = require('webpack');

console.log(__dirname)
module.exports = {
    entry: './frontend/js/app.js',
    output: {
        path: path.resolve(__dirname, './frontend/build'),
        filename: 'app.bundle.js'
    },
        module: {
         loaders: [
             {
                 test: /\.jsx?$/,
                 loader: 'babel-loader',
                 exclude: /node_modules/,
                 query: {
                     presets: ['es2015', 'react']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
