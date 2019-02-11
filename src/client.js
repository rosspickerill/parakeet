import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './reducers'
import Loadable from 'react-loadable'
import { ThemeProvider } from 'styled-components'

import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import theme from './theme'

const preloadedState = window.__INITIAL_STATE
delete window.__INITIAL_STATE // allows passed state to be garbage collected

const store = createStore(appReducers, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

Loadable.preloadReady().then(() =>{
// Create a theme instance.

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />
  }
}

const generateClassName = createGenerateClassName();

  ReactDOM.hydrate(
    <Provider store={ store }>
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
      </JssProvider>
    </Provider>,
    document.getElementById('root')
  )
})
