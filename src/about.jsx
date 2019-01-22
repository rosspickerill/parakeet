import React from 'react'
import { Link } from 'react-router-dom'

class About extends React.PureComponent {
  render() {
    return (<React.Fragment>
      <div>about page</div>
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

export default About
