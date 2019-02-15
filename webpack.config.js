const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { HotModuleReplacementPlugin } = require('webpack')

const serverConfig = {
 entry: './src/server.js',
 externals: (context, request, callback) => {
  if (/(react-loadable|stats)\.json/.test(request)) {
    return callback(null, `commonjs ${ request }`)
  }
  callback()
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
           plugins: ['@babel/plugin-syntax-dynamic-import',
           ['styled-components', {
            displayName: true,
            ssr: true,
          }],
          'react-loadable/babel']
         }
       },
       resolve: {
        extensions: [".js", ".jsx"]
      },
     }
   ]
 },
 plugins: [new HotModuleReplacementPlugin(),],
 output: {
  path: path.resolve('dist'),
  publicPath: '/',
  libraryTarget: 'commonjs2',
  pathinfo: true,
},
 name: 'server',
 target: 'node'
}

const clientConfig = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true&quiet=true',
   './src/client.js'
  ],
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
              'react-hot-loader/babel']

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
    new HotModuleReplacementPlugin(),
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].client.js',
    chunkFilename: '[name].client.js',
    publicPath: '/',
    pathinfo: true,
  },
  name: 'client'
}

module.exports = [clientConfig, serverConfig]
