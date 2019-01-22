import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class About extends React.PureComponent {
  render() {
    const { actor = 'default actor' } = this.props

    return (<React.Fragment>
      <div>about page</div>
      <div>{actor}</div>
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
