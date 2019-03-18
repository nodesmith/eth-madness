import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Hidden } from '@material-ui/core';
import Bracket from './Bracket';
import BracketMobile from './BracketMobile';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bracket: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit
    },
    marginTop: -30
  },
  titleBar: {
    maxWidth: '100%',
    paddingTop: theme.spacing.unit,
    height: 60
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

/**
 * Shows a submitted and filled out bracket entry which is not editable.
 */
class ViewEntry extends Component {
  render = () => {
    const { bracketName, submitter, transactionHash, games, classes, makePick, numRounds, submitEnabled,
            submitPicks, encodedPicks, topTeamScore, bottomTeamScore, message, changeBracketProperty } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleBar}>
          <Typography className={classes.title} align="center" variant="h5">{bracketName}</Typography>
          <Typography align="center" variant="caption"><a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank">{submitter}</a></Typography>
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
          isEditable={false}
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
          isEditable={false}
          />
        </Hidden>
      </div>
    );
  }
}

ViewEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  numRounds: PropTypes.number.isRequired,
  games: PropTypes.array.isRequired,
  topTeamScore: PropTypes.string.isRequired,
  bottomTeamScore: PropTypes.string.isRequired,
  bracketName: PropTypes.string.isRequired,
  submitter: PropTypes.string.isRequired,
  transactionHash: PropTypes.string.isRequired
};

export default withStyles(styles)(ViewEntry);
