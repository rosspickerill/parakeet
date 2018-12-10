module.exports = {
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
