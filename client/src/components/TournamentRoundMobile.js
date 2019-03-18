import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Game, { HEIGHT, MARGIN } from './Game';

const styles = theme => {
  const result = {
    root: {
      padding: theme.spacing.unit * 2
    },
    game: {
      marginBottom: theme.spacing.unit * 2
    },
    score : {

    },
    finalScoreLabel: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    submitButton: {
      marginTop: theme.spacing.unit * 2,
      height: 70,
      fontSize: 20,
      // position: 'absolute',
      // left: theme.spacing.unit * 2,
      // bottom: theme.spacing.unit * 2,
      // width: `calc(100vw - ${theme.spacing.unit * 4}px)`
    },
    navButtons: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    }
  };

  return result;
};

/**
 * Renders a 'Game' component for each game passed in the 'games' prop.
 */
class TournamentRoundMobile extends Component {
  
  createGame = (game) => {
    const { makePick, isEditable, classes } = this.props;

    const gameProps = { key: game.gameId, gameId: game.gameId, topSlotId: game.topSlotId,
      bottomSlotId: game.bottomSlotId, currentPickSlotId: game.currentPickSlotId, 
      topTeam: game.topTeam, bottomTeam: game.bottomTeam, classes:{ root: classes.game } };

    return (<Game {...gameProps} makePick={makePick} isEditable={isEditable} />);
  }

  submitPicks = () => {
    const { submitPicks, encodedPicks, topTeamScore, bottomTeamScore, message } = this.props;
    submitPicks(encodedPicks, parseInt(topTeamScore), parseInt(bottomTeamScore), message);
  }

  getFinalsComponent = () => {
    const { classes, games, message, submitEnabled, topTeamScore, bottomTeamScore, isEditable, changeBracketProperty } = this.props;
    return (
      <div className={classes.root}>
        {this.createGame(games[0])}
        <Grid container justify="center">
          <Grid item xs={4}>
                {
                  isEditable ?
                  (
                  <TextField
                    className={classes.score}
                    variant="outlined"
                    helperText="Winner Score"
                    margin="dense"
                    value={topTeamScore}
                    onChange={(event) => changeBracketProperty('teamA', event.target.value)}
                  />)
                  :
                  (
                    [<Typography key="score" align="center" variant="h4">{topTeamScore}</Typography>,
                    <Typography key="label" align="center" variant="body1">Winner Score</Typography>]
                  )
                }
          </Grid>
          <Grid item xs={4} className={classes.finalScoreLabel}>
            <Typography align="center" variant="caption">Final<br />Score</Typography>
          </Grid>
          <Grid item xs={4}>
                {
                  isEditable ?
                  (
                  <TextField
                    className={classes.score}
                    variant="outlined"
                    helperText="Loser Score"
                    margin="dense"
                    value={bottomTeamScore}
                    onChange={(event) => changeBracketProperty('teamB', event.target.value)}
                  />)
                  :
                  (
                    [<Typography key="score"  align="center" variant="h4">{bottomTeamScore}</Typography>,
                    <Typography key="label" align="center" variant="body1">Loser Score</Typography>]
                  )
                }
          </Grid>
          <Grid item xs={12}>
                {
                  isEditable ?
                  (
                  <TextField
                    variant="outlined"
                    helperText="Bracket Name (Optional)"
                    margin="dense"
                    fullWidth
                    value={message}
                    onChange={(event) => changeBracketProperty('bracketName', event.target.value)}
                  />)
                  :
                  null
                }
          </Grid>
          { isEditable && 
          <Grid item xs={12}>
            <Button className={classes.submitButton} color="primary" fullWidth variant="contained" disabled={!submitEnabled} onClick={() => this.submitPicks()} >Submit Bracket</Button>
          </Grid>
          }
        </Grid>
      </div>
    );
  }

  render() {
    const {games, classes, isFinals, nextButtonName, nextButtonAction, prevButtonName, prevButtonAction, } = this.props;
    if (isFinals) {
      return this.getFinalsComponent();
    } else {
      const prevButton = prevButtonName ? ([<KeyboardArrowLeft />,prevButtonName]) : undefined;
      const nextButton = nextButtonName ? ([nextButtonName,<KeyboardArrowRight />]) : undefined;
      return (
        <div className={classes.root}>
          {games.map(g => this.createGame(g))}
          <div className={classes.navButtons}>
            <Button onClick={prevButtonAction}>{prevButton}</Button>
            <Button onClick={nextButtonAction}>{nextButton}</Button>
          </div>
        </div>
      );
    }
  }
}

TournamentRoundMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  makePick: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,

  isFinals: PropTypes.bool.isRequired,
  submitEnabled: PropTypes.bool.isRequired,
  submitPicks: PropTypes.func.isRequired,
  encodedPicks: PropTypes.string,
  topTeamScore: PropTypes.string.isRequired,
  bottomTeamScore: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  changeBracketProperty: PropTypes.func.isRequired,

  nextButtonName: PropTypes.string.isRequired,
  nextButtonAction: PropTypes.func.isRequired,
  prevButtonName: PropTypes.string.isRequired,
  prevButtonAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(TournamentRoundMobile);
