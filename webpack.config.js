import path from 'path'
import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCss from 'mini-css-extract-plugin'
//const FileManagerPlugin = require('filemanager-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const routes = {
  src: path.resolve('src', 'js', 'app.js'),
  public: path.resolve('public'),
}

export const webpackConfig = {
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

  resolve: {
    extensions: ['.js', '.mjs'],
  },

  experiments: {
    outputModule: true,
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