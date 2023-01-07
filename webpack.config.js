const path = require('path')
const webpack = require('webpack')
//const FileManagerPlugin = require('filemanager-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const routes = {
  src: path.resolve('src', 'js', 'app.js'),
  public: path.resolve('public'),
}

module.exports = {
  mode: 'development',

  entry: [
    '@babel/polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
    routes.src,
  ],

  output: {
    path: routes.public,
    filename: 'app.js',
    publicPath: '/',
  },

  devtool: isDev ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCss.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        } 
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new FileManagerPlugin({
    //   events: {
    //     onStart: { delete: ['public'] },
    //   },
    // }),
    new MiniCss({
      filename: 'styles.css'
    }),
  ],
}