import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import TournamentRoundMobile from './TournamentRoundMobile';
import SwipeableViews from 'react-swipeable-views';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  roundTitle: {
    backgroundColor: theme.palette.grey['50'],
    marginTop: -theme.spacing.unit
  },
  header: {
    position: 'fixed',
    top: 120,
    left: 0,
    right: 0
  },
  gamesList: {
    top: 185,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
});

const roundDescriptions = {
  1: 'First Round',
  2: 'Round of 32',
  3: 'Sweet 16',
  4: 'Elite 8',
  5: 'Final Four',
  6: 'Championship'
}

/**
 * Layout container for the main sections of the Bracket (four regions & one final four component).
 */
class BracketMobile extends Component {
  state = { currentRound: 1, numRounds: 6 }

  createRound = (roundNumber) => {
    const {classes, topTeamScore, bottomTeamScore, message, encodedPicks, submitPicks, submitEnabled, makePick, numRounds, isEditable, games, changeBracketProperty } = this.props;
    const gamesInRound = games.filter(g => g.round === roundNumber);

    const prevButtonName = roundNumber === 1 ? null : roundDescriptions[roundNumber - 1];
    const prevButtonAction = roundNumber === 1 ? null : this.handleBack;

    const nextButtonName = roundNumber === 6 ? null : roundDescriptions[roundNumber + 1];
    const nextButtonAction = roundNumber === 6 ? null : this.handleNext;

    return (
      <TournamentRoundMobile
        isFinals={roundNumber === numRounds}
        makePick={this.makePickIntercepted}
        key={roundNumber}
        games={gamesInRound}
        roundNumber={roundNumber}
        isEditable={isEditable}
        submitEnabled={submitEnabled}
        changeBracketProperty={changeBracketProperty} 
        submitPicks={submitPicks}
        encodedPicks={encodedPicks}
        topTeamScore={topTeamScore}
        bottomTeamScore={bottomTeamScore}
        message={message}
        prevButtonName={prevButtonName}
        prevButtonAction={prevButtonAction}
        nextButtonName={nextButtonName}
        nextButtonAction={nextButtonAction}
        />
      );
  }

  makePickIntercepted = (gameId, teamId, slotId) => {
    const { makePick, games } = this.props;

    const gameRound = games[gameId].round;
    const unpickedGamesInRound = games.filter(g => g.round === gameRound && typeof g.currentPickSlotId === 'undefined');
    if (this.state.currentRound !== 6 && unpickedGamesInRound.length === 1 && unpickedGamesInRound[0].gameId === gameId && typeof slotId !== 'undefined') {
      // Advance to the next round for them
      this.handleNext();
    }

    makePick(gameId, teamId, slotId);
  }

  handleNext = () => {
    this.changeRound(this.state.currentRound + 1);
  }

  handleBack = () => {
    this.changeRound(this.state.currentRound - 1);
  }

  handleStepChange = (activeStep) => {
    this.changeRound(activeStep + 1);
  };

  changeRound = (newRound) => {
    this.setState({ currentRound: newRound }, () => {
      document.getElementById('gamesList').scrollTo(0,0);
    });
  }

  render = () => {
    const { isEditable, games, classes, submitPicks, submitEnabled, makePick, encodedPicks, topTeamScore, bottomTeamScore, message, changeBracketProperty  } = this.props;
    const { currentRound, numRounds } = this.state;

    const roundViews = [];
    for (let i = 1; i <= numRounds; i++) {
      roundViews.push(this.createRound(i));
    }

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.header}>
          <MobileStepper
              steps={numRounds}
              position="static"
              activeStep={currentRound - 1}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={currentRound === numRounds}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={currentRound === 1}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
            <div className={classes.roundTitle}>
              <Typography align="center" variant="h6">{roundDescriptions[currentRound]}</Typography>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.roundTitle}>
            <div className={classes.spacer}></div>
          </Grid>
            <div id="gamesList" className={classes.gamesList} >
              <SwipeableViews
              index={currentRound - 1}
              onChangeIndex={this.handleStepChange}>
              { roundViews }
            </SwipeableViews>
              </div>
        </Grid>
          
    );
  }
}

BracketMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  numRounds: PropTypes.number.isRequired,
  games: PropTypes.array.isRequired,
  makePick: PropTypes.func.isRequired,
  submitPicks: PropTypes.func.isRequired,
  submitEnabled: PropTypes.bool.isRequired,
  encodedPicks: PropTypes.string,
  topTeamScore: PropTypes.string.isRequired,
  bottomTeamScore: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  changeBracketProperty: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired
};

export default withStyles(styles)(BracketMobile);
