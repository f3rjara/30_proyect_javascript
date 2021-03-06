const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss|less|css)$/i,        
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./"
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|gif|svg|png|webp|ico)$/i,
        use: 'file-loader?name=assets/img/[name].[ext]'
      },
      {
        test: /\.(woff2?)$/i,
        use: 'file-loader?name=assets/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [    
    new HtmlWebpackPlugin({  
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = config;