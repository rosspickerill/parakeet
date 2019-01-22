import express from 'express'
import App from './app'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet , StyleSheetManager } from 'styled-components'
import { Provider } from 'react-redux'
import appReducers from './reducers'
import { createStore } from 'redux'

const app = express()
const port = 3000
app.use('/assets', express.static('dist/public'))

app.get('/*', (req, res) => {
  const context = {}
  const sheet = new ServerStyleSheet()
  const store = createStore(appReducers)
  const appString = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </Provider>
    </StaticRouter>
 );

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
     <script src="/assets/client.js"></script>
   </body>
 </html>`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
