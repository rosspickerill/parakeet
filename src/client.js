import React from 'react'
import ReactDOM from 'react-dom'
import Component from './component'

ReactDOM.hydrate(
  <Component />,
  document.getElementById('root')
)
