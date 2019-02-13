const webpack = require("webpack");
const path = require("path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        "./src/middlewareServer.js"
    ]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/react'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              ['styled-components', {
                displayName: true,
                ssr: true,
              }],
              'react-loadable/babel',
              'react-hot-loader/babel',]

          }
        },
        resolve: {
        extensions: [".js", ".jsx"]
      },
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      reportFilename: '../bundle.html',
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].client.js',
    chunkFilename: '[name].client.js',
    publicPath: '/assets/'
  },
  name: 'client'
}
