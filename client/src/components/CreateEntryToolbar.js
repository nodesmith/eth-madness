import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  button: {
    width: 100,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

/**
 * Component that contains buttons used to interact with a bracket entry (i.e. random button, clear, etc.).
 */
class CreateEntryToolbar extends Component {
  render = () => {
    const { classes, makeRandomPicks, clearPicks, perfectPicks, topSeedPicks } = this.props;
    return (
      <div className={classes.root}>
        <Button className={classes.button} variant="outlined" onClick={makeRandomPicks}>Random</Button>
        <Button className={classes.button} variant="outlined" onClick={topSeedPicks}>Top Seed</Button>
        <Button className={classes.button} variant="outlined" onClick={clearPicks}>Clear</Button>
      </div>
    );
  }
}

CreateEntryToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  makeRandomPicks: PropTypes.func.isRequired,
  clearPicks: PropTypes.func.isRequired,
  perfectPicks: PropTypes.func.isRequired,
  topSeedPicks: PropTypes.func.isRequired,
};

export default withStyles(styles)(CreateEntryToolbar);
