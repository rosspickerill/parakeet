const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

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

 output: {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/assets/'
},
 name: 'server',
 target: 'node'
}

const clientConfig = {
  mode: 'development',
  entry: [
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
              'react-loadable/babel']

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
    })
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

module.exports = [clientConfig, serverConfig]
