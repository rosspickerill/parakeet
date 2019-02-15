const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware')
const hotServerMiddleware = require('webpack-hot-server-middleware')

const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
 webpackDevMiddleware(compiler, {
   hot: true,
   noInfo: true,
   publicPath: '/',
   quiet: true,
   serverSideRender: true,
 }),
)

app.use(
 hotMiddleware(compiler.compilers.find(c => c.name === 'client')),
)
app.use(
 hotServerMiddleware(compiler),
)

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
