import React from 'react'
import Home from './home'
import About from './about'
import Users from './users'
import { Route } from 'react-router-dom'

const Component = () => {
 return (
   <React.Fragment>
    <div>A react app on the server</div>
      <Route path="/" exact component={Home} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
  </React.Fragment>
 )
}

export default Component
