import express from 'express'
import Component from './component'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

const app = express()
const port = 3000

app.get('/', (req, res) => {
 const app = ReactDOMServer.renderToString(<Component />);
 return res.status(200).send(`<div id="root">${app}</div>`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
