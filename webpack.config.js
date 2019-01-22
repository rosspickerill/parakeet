const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const serverConfig = {
 entry: './src/server.js',
 module: {
   rules: [
     {
       test: /\.(j|t)sx?$/,
       exclude: /(node_modules|bower_components)/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['@babel/preset-env','@babel/react'],
           plugins: ['@babel/plugin-syntax-dynamic-import']
         }
       },
       resolve: {
        extensions: [".js", ".jsx"]
      },
     }
   ]
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
            plugins: ['@babel/plugin-syntax-dynamic-import', "react-loadable/babel"]

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
    chunkFilename: '[name].client.js'
  },
  name: 'client'
}

module.exports = [serverConfig, clientConfig]
