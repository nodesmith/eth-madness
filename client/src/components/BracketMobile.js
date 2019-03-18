import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import TournamentRoundMobile from './TournamentRoundMobile';

const styles = theme => ({
  root: {
    width: '100%'
  },
});

/**
 * Layout container for the main sections of the Bracket (four regions & one final four component).
 */
class BracketMobile extends Component {
  state = { currentRound: 1, numRounds: 6 }

  createRound = (roundNumber) => {
    const { classes, makePick, numRounds, isEditable, games } = this.props;
    const gamesInRound = games.filter(g => g.round === roundNumber);
    return (
      <TournamentRoundMobile
          makePick={makePick}
          key={roundNumber}
          games={gamesInRound}
          roundNumber={roundNumber}
          isEditable={isEditable} />
      );
  }

  handleNext = () => {
    this.setState({ currentRound: this.state.currentRound + 1});
  }

  handleBack = () => {
    this.setState({ currentRound: this.state.currentRound - 1});
  }

  render = () => {
    const { isEditable, games, classes, submitPicks, submitEnabled, makePick, encodedPicks, topTeamScore, bottomTeamScore, message, changeBracketProperty  } = this.props;
    const { currentRound, numRounds } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
        <MobileStepper
            steps={numRounds}
            position="static"
            activeStep={currentRound - 1}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={currentRound === numRounds}>
                <KeyboardArrowRight />
                Next
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={currentRound === 1}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
          </Grid>
          <Grid item xs={12}>
            { this.createRound(currentRound) }
          </Grid>
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
