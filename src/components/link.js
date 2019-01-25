import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

class PageLink extends React.PureComponent {
 render() {
  console.log('PAGE LINK RENDER')
  const { to, children, ...props } = this.props
  return <Link {...props} to={ to }>{ children} </Link>
 }
}

export default styled(PageLink)`
 display: block;
 color:blue;
 padding: 1rem;
 background-color: ${ ({ theme }) => theme.colour};
`
