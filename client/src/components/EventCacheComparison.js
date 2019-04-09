import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography } from '@material-ui/core';
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

/**
 * Component for comparing different web3 providers
 */
class EventCacheComparison extends Component {
  createLoadingSourceWidget = (loadingSource) => {
    return (<LoadingSourceWidget processedBrackets={this.props.processedBrackets} key={loadingSource.name} loadingSource={loadingSource} />);
  }

  render = () => {
    const { classes, loadingSources } = this.props;
    const loadingSourcesComponents = Object.keys(loadingSources).map(l => this.createLoadingSourceWidget(loadingSources[l]));
    return (
        <Grid className={classes.root} container>
          <Grid item xs={12}>
            <Typography align="center" variant="h6">Loading Times</Typography>
            <Typography align="center" variant="caption">Loads the brackets from the contract using different web3 providers. <a target="_blank" rel="noopener noreferrer" href="https://medium.com/nodesmith-blog/smart-contract-event-cache-51519aa6a57d">Learn More</a></Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid className={classes.loadingSourcesContainer} container justify="center" spacing={24}>
              {loadingSourcesComponents}
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

EventCacheComparison.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingSources: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired,
  processedBrackets: PropTypes.bool.isRequired,
};

export default withStyles(styles)(EventCacheComparison);
