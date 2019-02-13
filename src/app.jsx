import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import LocationIcon from '@material-ui/icons/LocationCity'

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components'
import { withTheme, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
const StyledNavItem = styled.li`
  && {
    display: none;
    float: right;
    margin: 0 0.25rem;

    @media (min-width: ${({theme}) => theme.breakpoints.values.sm }px) {
      display: block;
    }
}
`
const StyledMenu = styled.li`
  && {
    float: right;
    list-style: none;
  }
`

const StyledNav = styled.ul`
  && {
    width: 100%;
    padding: 0;
}
`
const StyledButton = styled(Button)`
  && {
    padding: 0.75rem;
    letter-spacing: 0.8px;
}
`

const StyledIconButton = styled(Button)`
  && {
    padding: 0.25rem 0 0 0;
}
`

const Component = ({theme, classes}) => {
 return (
    <React.Fragment>
      <StyledAppBar position='sticky'>
        <Toolbar>
              <StyledNav>
                <StyledIconButton color='secondary' aria-label="Menu">
                    <LocationIcon style={{ fontSize: 38 }} />
                </StyledIconButton>
                <StyledMenu>
                  <IconButton color='secondary' aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                </StyledMenu>
                <StyledNavItem>
                  <StyledButton variant="contained" color='secondary'>Sign Up</StyledButton>
                </StyledNavItem>
                <StyledNavItem>
                  <StyledButton>Sign In</StyledButton>
                </StyledNavItem>
                <StyledNavItem>
                  <StyledButton>FAQ</StyledButton>
                </StyledNavItem>
                <StyledNavItem>
                  <StyledButton>Sell</StyledButton>
                </StyledNavItem>
                <StyledNavItem>
                  <StyledButton>Buy</StyledButton>
                </StyledNavItem>
              </StyledNav>
      </Toolbar>
     </StyledAppBar>
    <div>A react app on the server</div>
      <Route path="/" exact component={LoadableHome} />
      <Route path="/about/" exact component={LoadableAbout} />
      <Route path="/users/" exact component={LoadableUsers} />
  </React.Fragment>
 )
}

export default withTheme()(Component)
