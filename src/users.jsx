import React from 'react'
import { Link } from 'react-router-dom'

class Users extends React.PureComponent {
  render() {
    return (<React.Fragment>
      <div>users page</div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about/'>About</Link></li>
          <li><Link to='/users/'>Users</Link></li>
        </ul>
      </nav>
    </React.Fragment>)
  }
}

export default Users
