import React from 'react'
import Link from './components/link'
import { connect } from 'react-redux'
import styled from 'styled-components'

class WrappedTestTheme extends React.PureComponent {
  render() {
    return <TestTheme>Should be blue</TestTheme>
  }
}

const TestTheme = styled.div`
  background-color: ${({theme}) => theme.secondary }
`

class About extends React.PureComponent {
  render() {
    const { actor = 'default actor' } = this.props

    return (<React.Fragment>
      <div>about page</div>
      <div>{actor}</div>
      <WrappedTestTheme />
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

const mapStateToProps = state => {
  return {
    actor: state.actors.length > 0 ? state.actors[state.actors.length-1] : 'statedefault',
  }
}

export default connect(mapStateToProps)(About)
