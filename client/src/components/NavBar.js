import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

const HEADER_HEIGHT = 60;

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: HEADER_HEIGHT
  },
  navbar: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    borderBottomColor: '#005cc1',
    borderBottomStyle: 'solid',
    borderBottomWidth: 2,
    height: HEADER_HEIGHT,
    alignItems: 'center',
  },
  header: {
    textDecoration: 'none',
    width: 160
  },
  largerFont: {
    fontSize: '1.00rem'
  },
  logoSmall: {
    width: 50,
    marginLeft: 8,
    marginRight: 8,
  },
  logo: {
    width: 160,
    marginLeft: 24,
    marginRight: 24,
  }
};

/**
 * Center aligned NavBar for entire application.  Has a logo that takes users to the home route,
 * and a route on either side of the logo for the Leaderboard and Create Bracket routes.
 */
function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={`${classes.navbar} mui-fixed`}>
        <Toolbar>
          <NavLink to={{ pathname: `/leaders`, search: props.location.search}} className={classes.header}>
            <Typography align="right" className={classes.largerFont} variant="overline">Leaderboard</Typography>
          </NavLink>
          <NavLink to={{ pathname: `/`, search: props.location.search}}>
            <Hidden smUp>
              <img className={classes.logoSmall} src="/logoSmall.png" alt="Eth Madness Logo" />
            </Hidden>
            <Hidden xsDown>
             <img className={classes.logo} src="/logo.png" alt="Eth Madness Logo" />
            </Hidden>
          </NavLink>
          <NavLink to={{ pathname: `/enter`, search: props.location.search}} className={classes.header}>
            <Typography className={classes.largerFont} variant="overline">Create Bracket</Typography>
          </NavLink>        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);