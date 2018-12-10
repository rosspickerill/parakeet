module.exports = {
 entry: './src/server.js',
 module: {
   rules: [
     {
       test: /\.m?js$/,
       exclude: /(node_modules|bower_components)/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['@babel/preset-env']
         }
       }
     }
   ]
 },
 name: 'server',
 target: 'node'
}
