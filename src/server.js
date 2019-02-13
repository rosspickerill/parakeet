import express from 'express'
import App from './app'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet , StyleSheetManager, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import appReducers from './reducers'
import { createStore } from 'redux'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../dist/react-loadable.json'
import {
  MuiThemeProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import theme from './theme'

const app = express()
const port = 3000
app.use('/assets', express.static('dist/public'))

export function getRouteHandler(req, res){
  const context = {}
  const sheet = new ServerStyleSheet()
  const store = createStore(appReducers)
  let modules = []

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

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

app.get('/*', (req, res) => {
  getRouteHandler(req, res)
})


Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });
});
