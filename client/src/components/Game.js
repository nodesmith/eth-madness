import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import { getRoundForGameId } from '../utils/converters';

export const HEIGHT = 41;
export const MARGIN = 12;
export const WIDTH = 150;
const styles = theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 81
    },
    width: WIDTH,
    height: HEIGHT,
    pointerEvents: 'all'
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.palette.grey['300']
  },
  team: {
    [theme.breakpoints.down('sm')]: {
      height: 40
    },
    width: '100%',
    height: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row'
  },
  teamEditable: {
    cursor: 'pointer',
  },
  teamStatic: {
    cursor: 'auto'
  },
  teamName: {
    width: '100%',
    paddingLeft: 4,
    [theme.breakpoints.down('sm')]: {
      lineHeight: '40px',
      fontSize: 16
    },
    lineHeight: '20px',
    fontFamily: theme.typography.fontFamily,
    fontSize: 10,
    whiteSpace: 'nowrap'
  },
  teamSeed: {
    [theme.breakpoints.down('sm')]: {
      lineHeight: '40px',
      fontSize: 16,
      minWidth: 35
    },
    lineHeight: '20px',
    fontFamily: theme.typography.fontFamily,
    fontSize: 10,
    textAlign: 'right',
    minWidth: 25,
  },
  pickValue: {
    textAlign: 'right',
    paddingRight: theme.spacing.unit
  },
  pickedTeam: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  wrongPick: {
    backgroundColor: 'red',
    textDecoration: 'line-through',
    color: theme.palette.primary.contrastText
  },
  rightPick: {
    backgroundColor: 'green',
    color: theme.palette.primary.contrastText
  },
  impossiblePick: {
    textDecoration: 'line-through',
    fontWeight: 'lighter',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.error.light,
  },
  previouslyEliminatedNotPicked: {
    textDecoration: 'line-through',
    fontWeight: 'lighter',
  },
  winningTeam: {
    fontWeight: 'bold'
  },
  losingTeam: {
    fontWeight: 'lighter'
  },
  topTeam: {
    borderRadius: '2px 2px 0px 0px'
  }, bottomTeam: {
    borderRadius: '0px 0px 2px 2px'
  }
});

/**
 * Component that shows two teams in a box, one team name above the other.  Both 
 * teams are clickable, allowing the user to select the winning team.
 */
class Game extends Component {
  makePick = (teamId, slotId) => {
    const { makePick, gameId } = this.props;
    makePick(gameId, teamId, slotId);
  }

  createTeamName = (seed, teamName, pickValue) => {
    if (!seed || !teamName) {
      return undefined;
    }

    const { classes } = this.props;

    return [
      <div key="seed" className={this.props.classes.teamSeed}>{seed}.</div>,
      <span key="name" className={this.props.classes.teamName}>{teamName}</span>,
      <span key="name" className={[classes.teamName, classes.pickValue].join(' ')}>{pickValue}</span>
    ]
  }

  createTeamLine = (team, slotId, currentPickSlotId) => {
    const { classes, isEditable, eliminatedTeamIds, gameResult, gameId } = this.props;

    const rootClasses = [this.props.classes.team];
    const round = getRoundForGameId(gameId);
    const hasTeamToWrite = typeof team.teamId !== 'undefined';
    const wasPicked = (hasTeamToWrite && slotId === currentPickSlotId);
    const wasEliminatedThisRound = hasTeamToWrite && eliminatedTeamIds[team.teamId] === round;
    const wasEliminatedInAnEarlierRound = hasTeamToWrite && eliminatedTeamIds[team.teamId] > 0; // They exist in the eliminated teams
    let pickValue = '';

    if (hasTeamToWrite) {
      if (wasPicked && !wasEliminatedInAnEarlierRound && !wasEliminatedThisRound && !gameResult) {
        rootClasses.push(this.props.classes.pickedTeam);
      } else if (wasPicked && wasEliminatedThisRound) {
        rootClasses.push(this.props.classes.wrongPick);
      } else if (wasPicked && wasEliminatedInAnEarlierRound) {
        rootClasses.push(this.props.classes.impossiblePick);
      } else if (wasPicked && gameResult && gameResult.winningTeamId === team.teamId) {
        rootClasses.push(this.props.classes.rightPick);
        pickValue = `+${2 ** (round - 1)}`
      } else if (!wasPicked && wasEliminatedInAnEarlierRound) {
        rootClasses.push(this.props.classes.previouslyEliminatedNotPicked);
      }

      if (gameResult && gameResult.winningTeamId === team.teamId) {
        rootClasses.push(this.props.classes.winningTeam);
      }
    }

    rootClasses.push(slotId % 2 === 0 ? classes.topTeam : classes.bottomTeam);

    let onTeamClick = () => this.makePick(wasPicked ? undefined : team.teamId, slotId);
    if (isEditable) {
      rootClasses.push(classes.teamEditable);
    } else {
      onTeamClick = undefined;
      rootClasses.push(classes.teamStatic);
    }

    return (
      <div key={slotId} className={rootClasses.join(' ')} onClick={onTeamClick}>
        {this.createTeamName(team.seed, team.teamName, pickValue)}
      </div>
    )
  }

  render() {
    const {topTeam, bottomTeam, classes, topSlotId, bottomSlotId, currentPickSlotId} = this.props;
    return (
      <div className={classes.root}>
        <Paper >
          {[
            this.createTeamLine(topTeam, topSlotId, currentPickSlotId),
            (<div key="divider" className={classes.divider}></div>),
            this.createTeamLine(bottomTeam, bottomSlotId, currentPickSlotId),
          ]}
        </Paper>
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
  topTeam: PropTypes.object.isRequired,
  bottomTeam: PropTypes.object.isRequired,
  gameId: PropTypes.number.isRequired,
  topSlotId: PropTypes.number.isRequired,
  bottomSlotId: PropTypes.number.isRequired,
  currentPickSlotId: PropTypes.number,
  makePick: PropTypes.func.isRequired,
  gameResult: PropTypes.object,
  eliminatedTeamIds: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
