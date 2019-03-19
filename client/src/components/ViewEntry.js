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
    width: '100%',
    maxWidth: '100%',
    paddingTop: theme.spacing.unit,
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-evenly',
    maxWidth: 700
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

/**
 * Shows a submitted and filled out bracket entry which is not editable.
 */
class ViewEntry extends Component {
  render = () => {
    const { bracketName, submitter, transactionHash, games, classes, makePick, numRounds, submitEnabled,
            submitPicks, encodedPicks, topTeamScore, bottomTeamScore, message, changeBracketProperty, eliminatedTeamIds, bracketScore, bracketId } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleBar}>
          <Typography className={classes.title} align="center" variant="h5">{bracketName}</Typography>
          <div className={classes.subheader} >
            <Typography className={classes.title} align="center" variant="h6"><span>Score: {bracketScore}</span></Typography>
            <Typography className={classes.title} align="center" variant="h6"><span><a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank">View Tx</a></span></Typography>
          </div>
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
          eliminatedTeamIds={eliminatedTeamIds}
          bracketId={bracketId}
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
          eliminatedTeamIds={eliminatedTeamIds}
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
  bracketScore: PropTypes.number.isRequired,
  submitter: PropTypes.string.isRequired,
  transactionHash: PropTypes.string.isRequired,
  eliminatedTeamIds: PropTypes.object.isRequired,
  bracketId: PropTypes.number.isRequired
};

export default withStyles(styles)(ViewEntry);
