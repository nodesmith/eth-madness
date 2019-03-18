import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Game, { HEIGHT, MARGIN } from './Game';

const styles = theme => {
  const result = {
    root: {
      padding: theme.spacing.unit * 2
    },
    game: {
      marginBottom: theme.spacing.unit * 2
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

  render() {
    const {games, classes} = this.props;
    return (
      <div className={classes.root}>
        {games.map(g => this.createGame(g))}
      </div>
    );
  }
}

TournamentRoundMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  makePick: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired
};

export default withStyles(styles)(TournamentRoundMobile);
