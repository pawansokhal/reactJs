const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  // externals : {
   
  // },
  entry:[
    './src/containers/js/bootstrap.min.js',
    './src/containers/js/html5shiv.js',
    './src/containers/js/jquery.min.js',
    // './src/containers/js/respond.js',
    // './src/containers/js/jquery-ui.js',
    // './src/containers/js/npm.js',
    './src/containers/js/owl.carousel.min.js',
    './src/index.js',
    // './src/app.js',

  ],
    
output: {
    path: path.resolve(__dirname, 'containers'),
    filename: 'bundle.js',
    chunkFilename:'[id][hash].js',
    publicPath:'/'
  },
  plugins: [
    new NpmAutoInstallWebpackPlugin(options),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader',
          'extract-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      use: [{
        loader: 'url-loader',
        options: { 
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
        } 
    }],
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }

    ]
  }
}