import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageType = styled.div`
background-color: red;
`

class Home extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageType>home page</PageType>
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
