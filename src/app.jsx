import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const LoadableHome = Loadable({
  loader: () => import('./home'),
  loading() {
    return null
  }
})

const LoadableUsers = Loadable({
  loader: () => import('./users'),
  loading() {
    return null
  }
})
const LoadableAbout = Loadable({
  loader: () => import('./about'),
  loading() {
    return null
  }
})

const Component = () => {
 return (
   <React.Fragment>
    <div>A react app on the server</div>
      <Route path="/" exact component={LoadableHome} />
      <Route path="/about/" exact component={LoadableAbout} />
      <Route path="/users/" exact component={LoadableUsers} />
  </React.Fragment>
 )
}

export default Component
