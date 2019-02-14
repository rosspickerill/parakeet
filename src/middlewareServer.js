const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../webpack.config.js')[1];
const compiler = webpack(config);
const getRouteHandler = require('./server').getRouteHandler

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
 noInfo: true,
 publicPath: '/',
 quiet: true,
 serverSideRender: true,
}));

app.get('/*', (req, res) => {
 res.status(200).send('helo')
  getRouteHandler(req, res)
})

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
