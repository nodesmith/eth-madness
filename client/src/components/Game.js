import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';

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
      width: 40
    },
    lineHeight: '20px',
    fontFamily: theme.typography.fontFamily,
    fontSize: 10,
    textAlign: 'right',
    width: 25,
  },
  pickedTeam: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
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

  createTeamName = (seed, teamName) => {
    if (!seed || !teamName) {
      return undefined;
    }

    return [
      <div key="seed" className={this.props.classes.teamSeed}>{seed}.</div>,
      <span key="name" className={this.props.classes.teamName}>{teamName}</span>
    ]
  }

  createTeamLine = (team, slotId, currentPickSlotId) => {
    const { classes, isEditable } = this.props;
    const rootClasses = [this.props.classes.team];
    let wasPicked = false;
    if (typeof team.teamId !== 'undefined' && slotId === currentPickSlotId) {
      rootClasses.push(this.props.classes.pickedTeam);
      wasPicked = true;
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
        {this.createTeamName(team.seed, team.teamName)}
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
  gameResult: PropTypes.object
};

export default withStyles(styles)(Game);
