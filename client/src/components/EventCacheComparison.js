import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Typography, Paper } from '@material-ui/core';
import LoadingSourceWidget from './LoadSourceWidget';

const styles = theme => ({
  root: {
    width: '100%',
  },
  loadingSourcesContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
    return (<LoadingSourceWidget key={loadingSource.name} loadingSource={loadingSource} />);
  }

  render = () => {
    const { classes, loadingSources, reloadData } = this.props;
    const loadingSourcesComponents = Object.keys(loadingSources).map(l => this.createLoadingSourceWidget(loadingSources[l]));
    const sizes = { xl: 7, lg: 8, md: 9, sm: 11, xs: 12};
    return (
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Typography align="center" variant="h6">Event Logs Loading Time</Typography>
            <Typography align="center" variant="caption">measures how long it take to load the brackets using different providers</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid className={classes.loadingSourcesContainer} container justify="center" spacing={24}>
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
