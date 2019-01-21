const path = require('path')

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
           presets: ['@babel/preset-env','@babel/react']
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
            presets: ['@babel/preset-env','@babel/react']
          }
        },
        resolve: {
        extensions: [".js", ".jsx"]
      },
      }
    ]
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'client.js'
  },
  name: 'client'
}

module.exports = [serverConfig, clientConfig]
