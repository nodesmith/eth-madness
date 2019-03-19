import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import Bracket from './Bracket';
import BracketMobile from './BracketMobile';
import CreateEntryToolbar from './CreateEntryToolbar';
import SubmitPicksContainer from '../containers/SubmitPicksContainer';
import _ from 'lodash';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bracket: {
    margin: '0 auto',
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0
    },

    // marginTop: theme.spacing.unit * -5
  },
  header: {
    position: 'fixed',
    top: 60,
    left: 0,
    right: 0
  }
});

/**
 * Layout component for the main bracket and the toolbar used to interact with the bracket (random button, etc.)
 */
class CreateEntry extends Component {
  render = () => {
    const { games, classes, makePick, numRounds, submitEnabled, submitPicks, encodedPicks, topTeamScore, bottomTeamScore, message, changeBracketProperty } = this.props;
    const createEntryProps = _.pick(this.props, 'perfectPicks', 'makeRandomPicks', 'clearPicks', 'topSeedPicks');
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <CreateEntryToolbar {...createEntryProps} />
        </div>
        <Hidden smDown>
          <Bracket 
            classes={{root: classes.bracket}}
            games={games}
            makePick={makePick}
            numRounds={numRounds}
            submitPicks={submitPicks}
            submitEnabled={submitEnabled}
            encodedPicks={encodedPicks}
            topTeamScore={topTeamScore}
            bottomTeamScore={bottomTeamScore}
            message={message}
            changeBracketProperty={changeBracketProperty}
            isEditable={true}
            eliminatedTeamIds={{}}
            />
        </Hidden>
        <Hidden mdUp>
        <BracketMobile
          classes={{root: classes.bracket}}
          games={games}
          makePick={makePick}
          numRounds={numRounds}
          submitPicks={submitPicks}
          submitEnabled={submitEnabled}
          encodedPicks={encodedPicks}
          topTeamScore={topTeamScore}
          bottomTeamScore={bottomTeamScore}
          message={message}
          changeBracketProperty={changeBracketProperty}
          isEditable={true}
          eliminatedTeamIds={{}}
          />
        </Hidden>
        <SubmitPicksContainer />
      </div>
    );
  }
}

CreateEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  numRounds: PropTypes.number.isRequired,
  games: PropTypes.array.isRequired,
  makePick: PropTypes.func.isRequired,
  makeRandomPicks: PropTypes.func.isRequired,
  topSeedPicks: PropTypes.func.isRequired,
  clearPicks: PropTypes.func.isRequired,
  submitPicks: PropTypes.func.isRequired,
  submitEnabled: PropTypes.bool.isRequired,
  perfectPicks: PropTypes.func.isRequired,
  encodedPicks: PropTypes.string,
  topTeamScore: PropTypes.string.isRequired,
  bottomTeamScore: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  changeBracketProperty: PropTypes.func.isRequired, 
};

export default withStyles(styles)(CreateEntry);
