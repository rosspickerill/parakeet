import express from 'express'
import App from './app'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet , StyleSheetManager } from 'styled-components'
import { Provider } from 'react-redux'
import appReducers from './reducers'
import { createStore } from 'redux'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../dist/react-loadable.json'
// /Users/ross/Documents/repos/parakeet/dist/react-loadable.json
// /Users/ross/Documents/repos/parakeet/src/server.js

const app = express()
const port = 3000
app.use('/assets', express.static('dist/public'))

app.get('/*', (req, res) => {
  const context = {}
  const sheet = new ServerStyleSheet()
  const store = createStore(appReducers)
  let modules = []
  const appString = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StyleSheetManager sheet={sheet.instance}>
            <App />
          </StyleSheetManager>
          </Loadable.Capture>
      </Provider>
    </StaticRouter>
 );

 console.log(modules)
 let bundles = getBundles(stats, modules);
 console.log('bundles----->', bundles)
 const preloadedState = store.getState()
 return res.status(200).send(`<!doctype html>
 <html>
   <head>
    ${ sheet.getStyleTags() }
   </head>
   <body>
     <div id='root'>${ appString }</div>
     <script>
      window.__INITIAL_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
     </script>
     <script src="/assets/main.client.js"></script>
     <script src="/assets/0.client.js"></script>
     <script src="/assets/1.client.js"></script>
     <script src="/assets/2.client.js"></script>
     <script src="/assets/3.client.js"></script>
   </body>
 </html>`)
})


Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });
});
