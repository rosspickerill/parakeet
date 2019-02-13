const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.middleware.config');
const compiler = webpack(webpackConfig);
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
//const getRouteHandler = require('./server').getRouteHandler
const { ServerStyleSheet , StyleSheetManager, ThemeProvider } = require('styled-components')
const { createStore } =require('redux')
const Loadable = require('react-loadable')
const { getBundles } = require('react-loadable/webpack')
const stats = require('../dist/react-loadable.json')
const {
  MuiThemeProvider,
  createGenerateClassName,
} = require('@material-ui/core/styles')
const { SheetsRegistry } = require('jss')
const JssProvider = require('react-jss/lib/JssProvider')
const theme = require('./theme')

function getRouteHandler(req, res) {
    const context = {}
    const sheet = new ServerStyleSheet()
    const store = createStore(appReducers)
    let modules = []

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry()

    // Create a sheetsManager instance.
    const sheetsManager = new Map()

    // Create a new class name generator.
    const generateClassName = createGenerateClassName()

    const appString = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <ThemeProvider theme={theme}>
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              <StyleSheetManager sheet={sheet.instance}>
                <App />
              </StyleSheetManager>
              </Loadable.Capture>
            </ThemeProvider>
            </MuiThemeProvider>
            </JssProvider>
        </Provider>
      </StaticRouter>
   )
   const css = sheetsRegistry.toString()

   let bundles = getBundles(stats, modules)
   const preloadedState = store.getState()
   return res.status(200).send(`<!doctype html>
   <html>
     <head>
     <style>
      html {
        font-size: 16px;
      }
      body {
        font-family: 'Lato', sans-serif;
        margin: 0;
      }
     </style>
      <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      <style id="jss-server-side">${css}</style>
      <link href="https://fonts.googleapis.com/css?family=Lato:300,400,500" rel="stylesheet">
      ${ sheet.getStyleTags() }
     </head>
     <body>
       <div id='root'>${ appString }</div>
       <script>
        window.__INITIAL_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
       </script>
       ${bundles.map(bundle => {
        return `<script src="/assets/${bundle.file}"></script>`
        // alternatively if you are using publicPath option in webpack config
        // you can use the publicPath value from bundle, e.g:
        // return `<script src="${bundle.publicPath}"></script>`
      }).join('\n')}
      <script src="/assets/main.client.js"></script>
     </body>
   </html>`)
  }

// webpack hmr
app.use(
    require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    })
);

app.use(require('webpack-hot-middleware')(compiler));

// static assets
app.use('/assets', express.static('dist/public'))

// main route
app.get('/*', (req, res) =>
   getRouteHandler(req, res)
);

// app start up
Loadable.preloadAll().then(() => {
    app.listen(3000, () => {
      console.log(`Example app listening on port 3000!`)
    });
  });
