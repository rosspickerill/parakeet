import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components'
import { withTheme, withStyles } from '@material-ui/core/styles'

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

const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${({theme}) => theme.palette.primary[800] };
  }
`

const styles = theme => ({
  appbar:{
    color: theme.palette.accent[700],
  }
})

const Component = ({theme, classes}) => {
 return (
    <React.Fragment>
      <StyledAppBar position='sticky'>
        <Toolbar>
          <IconButton color='accent' aria-label="Menu">
           <MenuIcon classes={classes.appbar} />
          </IconButton>
      </Toolbar>
     </StyledAppBar>
    <div>A react app on the server</div>
      <Route path="/" exact component={LoadableHome} />
      <Route path="/about/" exact component={LoadableAbout} />
      <Route path="/users/" exact component={LoadableUsers} />
  </React.Fragment>
 )
}

export default withTheme()(withStyles(styles)(Component))
