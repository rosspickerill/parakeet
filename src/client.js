import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './reducers'
import Loadable from 'react-loadable'
import { ThemeProvider } from 'styled-components'

const preloadedState = window.__INITIAL_STATE
delete window.__INITIAL_STATE // allows passed state to be garbage collected

const store = createStore(appReducers, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

Loadable.preloadReady().then(() =>{
  const theme = {
    colour: 'red',
  }

  ReactDOM.hydrate(
    <Provider store={ store }>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
})
