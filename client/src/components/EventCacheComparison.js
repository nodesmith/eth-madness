import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Typography, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  timer: {
    height: 50,
    width: 150,
    backgroundColor: 'black',
    fontColor: 'red'
  },
  timerText: {
    color: 'red',
    lineHeight: '50px',
    textAlign : 'center',
    fontFamily: 'digital',
    fontSize: '40px'
  }
});

const pad = (val, digits) => {
  let res = val.toString();
  while (res.length < digits) {
    res = '0' + res;
  }

  return res;
}

/**
 * Component for comparing different web3 providers
 */
class EventCacheComparison extends Component {
  createLoadingSourceWidget = (loadingSource) => {
    const { name, durationMs } = loadingSource;
    const { classes } = this.props;
    const seconds = Math.floor(durationMs / 1000);
    const ms = durationMs - (seconds * 1000);
    
    const timeString = pad(seconds, 2) + '.' + pad(ms, 2);
    return (
      <Grid item xl={1} l={2} md={2} s={3} xs={12} key={name}>
        <Typography align="center" variant="body1">{name}</Typography>
        <div className={classes.timer}>
          <div className={classes.timerText}>
            {timeString}
          </div>
        </div>
      </Grid>
    );
  }

  render = () => {
    const { classes, loadingSources, reloadData } = this.props;
    const loadingSourcesComponents = Object.keys(loadingSources).map(l => this.createLoadingSourceWidget(loadingSources[l]));
    const sizes = { xl: 7, lg: 8, md: 9, sm: 11, xs: 12};
    return (
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Typography align="center" variant="h6">Loading Times Scoreboard</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={24}>
              {loadingSourcesComponents}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

EventCacheComparison.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingSources: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired
};

export default withStyles(styles)(EventCacheComparison);
