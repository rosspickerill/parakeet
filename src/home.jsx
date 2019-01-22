import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div>home page</div>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about/'>About</Link></li>
            <li><Link to='/users/'>Users</Link></li>
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default Home
