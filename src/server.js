import express from 'express'
import App from './app'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

const app = express()
const port = 3000
console.log('here', path.resolve(__dirname, 'dist/public'))
app.use('/assets', express.static('dist/public'))

app.get('/*', (req, res) => {
  const context = {}
 const appString = ReactDOMServer.renderToString(
   <StaticRouter location={req.url} context={context}>
    <App />
 </StaticRouter>
 );
 return res.status(200).send(`<!doctype html>
 <html>
   <head>
   </head>
   <body>
     <div id='root'>${ appString }</div>
     <script src="/assets/client.js"></script>
   </body>
 </html>`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
