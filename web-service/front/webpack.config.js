/* global __dirname */

const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const _compact = require('lodash/fp/compact')

const isDev = process.env.NODE_ENV !== 'production'

const useMocks = process.env.USE_MOCKS === 'true'

module.exports = {
  cache: true,
  devtool: isDev ? 'inline-source-map' : false,
  context: path.join(__dirname, 'app'),

  entry: {
    index: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      './sass/style.scss',
      './index',
    ],
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@app': path.resolve(__dirname, 'app'),
      '@locale': path.resolve(__dirname, 'app/locale/strings.js'),
    },
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://server-test.com',
        changeOrigin: true,
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
        loader: 'babel-loader?cacheDirectory=true',
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          { loader: 'url-loader', options: { limit: 8192 } },
          { loader: 'image-webpack-loader', options: { bypassOnDebug: true } },
        ],
      },
      {
        test: /\.(pdf)$/,
        include: path.resolve(__dirname, 'app', 'static', 'files'),
        loaders: ['file-loader?name=[name].[ext]'],
      },
    ],
  },

  plugins: _compact([
    !isDev && new CleanWebpackPlugin({ dry: isDev }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      title: 'Reporting',
      favicon: 'favicon.png',
      template: './index.html',
      production: !isDev,
      development: isDev,
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(isDev),
      USE_MOCKS: JSON.stringify(useMocks),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ]),
}
