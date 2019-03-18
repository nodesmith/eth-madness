import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TournamentRound from './TournamentRound';
import { WIDTH } from './Game';
import FinalFour from './FinalFour';

const styles = theme => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    pointerEvents: 'none'
  },
  regionsContainer: {
    display: 'flex'
  },
  finalFourContainer: {
    margin: 'auto',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none'
  },
  finalFour: {
    pointerEvents: 'auto'
  },
  side: {
    display: 'block',
    padding: theme.spacing.unit * 2
  },
  region: {
    display: 'flex',
  },
  region_top: {
    marginBottom: theme.spacing.unit * 12,
  },
  region_west: {
    flexDirection: 'row',
  },
  region_east: {
    flexDirection: 'row-reverse',
  },
  roundMargin_west_2: {
    marginLeft: WIDTH / -3
  },
  roundMargin_west_3: {
    marginLeft: WIDTH / -1.5
  },
  roundMargin_east_2: {
    marginRight: WIDTH / -3
  },
  roundMargin_east_3: {
    marginRight: WIDTH / -1.5
  }
});

/**
 * Layout container for the main sections of the Bracket (four regions & one final four component).
 */
class Bracket extends Component {
  createRegionalBracket = (regionName, regionGames, side, topOrBottom) => {
    const { classes, makePick, numRounds, isEditable } = this.props;

    const rounds = [];
    for (let i = 1; i <= numRounds - 2; i++) {
      rounds.push({
        roundNumber: i,
        games: regionGames.filter(g => g.round === i)
      });
    }

    const roundElements = rounds.map((round, i) => {
      return (
        <TournamentRound
          classes={{root: classes[`roundMargin_${side}_${i}`]}}
          makePick={makePick}
          key={round.roundNumber}
          games={round.games}
          roundNumber={round.roundNumber}
          isEditable={isEditable} />);
    });

    return (
      <div key={regionName} className={`${classes.region} ${classes['region_' + side]} ${classes['region_' + topOrBottom]}`}>
        {roundElements}
      </div>
    );
  }

  render = () => {
    const { isEditable, games, classes, submitPicks, submitEnabled, makePick, encodedPicks, topTeamScore, bottomTeamScore, message, changeBracketProperty  } = this.props;

    const gamesForRegions = {
      final_four: games.filter(g => g.region === 'final_four'),
      north_west: games.filter(g => g.region === 'north_west'),
      south_west: games.filter(g => g.region === 'south_west'),
      north_east: games.filter(g => g.region === 'north_east'),
      south_east: games.filter(g => g.region === 'south_east')
    };

    return (
      <div className={classes.root}>
        <div className={classes.regionsContainer}>
          <div className={classes.side}>
            {this.createRegionalBracket('north_west', gamesForRegions.north_west, 'west', 'top')}
            {this.createRegionalBracket('south_west', gamesForRegions.south_west, 'west', 'bottom')}
          </div>
          <div className={classes.side + ' ' + classes.east}>
            {this.createRegionalBracket('north_east', gamesForRegions.north_east, 'east', 'top')}
            {this.createRegionalBracket('south_east', gamesForRegions.south_east, 'east', 'bottom')}
          </div>
        </div>
        <div className={classes.finalFourContainer}>
          <FinalFour
            classes={{root: classes.finalFour}}
            games={gamesForRegions.final_four}
            makePick={makePick}
            submitPicks={submitPicks}
            submitEnabled={submitEnabled}
            encodedPicks={encodedPicks}
            topTeamScore={topTeamScore}
            bottomTeamScore={bottomTeamScore}
            message={message}
            changeBracketProperty={changeBracketProperty}
            isEditable={isEditable}
            />
        </div>
      </div>
    );
  }
}

Bracket.propTypes = {
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

export default withStyles(styles)(Bracket);
