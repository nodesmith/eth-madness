import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Button, Typography, TextField } from '@material-ui/core';
import Game, { HEIGHT } from './Game';

const styles = theme => ({
  root: {
    width: 700,
    height: 160,
    display: 'flex',
    flexDirection: 'column'
  },
  games: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between' ,
    alignItems: 'center'
  },
  submitButton: {
    marginTop: 'auto',
    alignSelf: 'flex-end'
  },
  finals: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 1
  },
  scoreContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  staticScoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit * 1
  },
  tweetContainer: {

  },
  staticFinalsGame: {
    margin: theme.spacing.unit * 1
  },
  score: {
    width: theme.spacing.unit * 5,
    height: HEIGHT * 1.4,
    margin: 0
  },
  nameContainer: {
    width: '100%',
    marginBottom: theme.spacing.unit
  }
});

/**
 * Component that sits in the middle of a bracket. This component shows the two final 
 * four games, and also the large championship component.
 */
class FinalFour extends Component {
  createGame = (game, makePick, roundNumber) => {
    const { isEditable, eliminatedTeamIds } = this.props;

    return (<Game 
      key={game.gameId}
      gameId={game.gameId}
      topSlotId={game.topSlotId}
      bottomSlotId={game.bottomSlotId}
      currentPickSlotId={game.currentPickSlotId}
      topTeam={game.topTeam}
      bottomTeam={game.bottomTeam}
      makePick={makePick}
      isEditable={isEditable}
      gameResult={game.gameResult}
      eliminatedTeamIds={eliminatedTeamIds[roundNumber] || {}}
      />);
  }

  submitPicks = () => {
    const { submitPicks, encodedPicks, topTeamScore, bottomTeamScore, message } = this.props;
    submitPicks(encodedPicks, parseInt(topTeamScore), parseInt(bottomTeamScore), message);
  }

  getEditableFinalsComponent = () => {
    const { games, classes, makePick, submitEnabled, message, changeBracketProperty, topTeamScore, bottomTeamScore} = this.props;
    
    return (
      <Paper className={classes.finals} >
        <Typography align="center" variant="h6">Championship</Typography>
        <div className={classes.scoreContainer} >
          <TextField
            className={classes.score}
            variant="outlined"
            helperText="Winner Score"
            margin="dense"
            value={topTeamScore}
            onChange={(event) => changeBracketProperty('teamA', event.target.value)}
          />
            { this.createGame(games[2], makePick) }
          <TextField
            className={classes.score}
            variant="outlined"
            helperText="Loser Score"
            margin="dense"
            value={bottomTeamScore}
            onChange={(event) => changeBracketProperty('teamB', event.target.value)}
          />
        </div>
        <div className={classes.nameContainer} >
          <TextField
            fullWidth
            label="Bracket Name (Optional)"
            margin="dense"
            variant="outlined"
            value={message}
            onChange={(event) => changeBracketProperty('bracketName', event.target.value)}
          />
        </div>
        <Button className={classes.submitButton} color="primary" fullWidth variant="contained" disabled={!submitEnabled} onClick={() => this.submitPicks()} >Submit Bracket</Button>
      </Paper>
    )
  }

  getStaticFinalsComponent = () => {
    const { games, classes, makePick, topTeamScore, bottomTeamScore, bracketId} = this.props;
    
    const bracketLink = `${window.origin}/bracket/${bracketId}`;
    const tweetContent = `Check out my March Madness bracket - stored in a smart contract via ethmadness.com built by @nodesmith %23ethmaness. ${bracketLink}`
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetContent}`;
    
    return (
      <Paper className={classes.finals} >
        <Typography align="center" variant="h6">Championship</Typography>

        <div className={classes.scoreContainer} >
          <div className={classes.staticScoreContainer} >
            <Typography align="center" variant="body1">{topTeamScore}</Typography>
            <Typography align="center" variant="caption">Winner Score</Typography>
          </div>
          { this.createGame(games[2], makePick, 6) }
          <div className={classes.staticScoreContainer} >
            <Typography align="center" variant="body1">{bottomTeamScore}</Typography>
            <Typography align="center" variant="caption">Loser Score</Typography>
          </div>
        </div>

        <div className={classes.staticScoreContainer} >
          <Typography variant="body1">
            <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="twitter-share-button">Share This Bracket</a>
          </Typography>
        </div>
      </Paper>
    )
  }

  render = () => {
    const { games, classes, makePick, isEditable} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.games}>
          <div className={classes.finalFour}>
            <Typography align="center" variant="caption">Final Four</Typography>
            { this.createGame(games[0], makePick, 5) }
          </div>
          { isEditable ? this.getEditableFinalsComponent() : this.getStaticFinalsComponent() }
          <div className={classes.finalFour}>
            <Typography align="center" variant="caption">Final Four</Typography>
            { this.createGame(games[1], makePick, 5) }
          </div>
        </div>
      </div>
    );
  }
}

FinalFour.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  submitEnabled: PropTypes.bool.isRequired,
  submitPicks: PropTypes.func.isRequired,
  encodedPicks: PropTypes.string,
  topTeamScore: PropTypes.string.isRequired,
  bottomTeamScore: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  changeBracketProperty: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  eliminatedTeamIds: PropTypes.object.isRequired,
  bracketId: PropTypes.number
};

export default withStyles(styles)(FinalFour);
