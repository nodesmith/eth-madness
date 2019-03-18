import { connect } from 'react-redux';
import * as Actions from '../actions';
import LoadingContainer from '../components/LoadingContainer';

const mapStateToProps = (state) => {
  const path = state.router.location.pathname;
  const bracketId = parseInt(path.substring(path.lastIndexOf('/') + 1));
  if (bracketId === NaN) {
    throw 'Illegal Bracket id' // TODO
  }

  const entry = state.leaderboard.allEntries[bracketId];
  if (!entry) {
    // If we don't have this entry in our collection of entries, try reloading the data
    
    return {
      isLoading: true,
      realProps: {}
    }
  }
  const resultsByGameId = state.leaderboard.resultsByGameId;
  return {
    isLoading: false,
    realProps: {
      numRounds: state.games.numRounds,
      topTeamScore: entry.scoreA || '-99',
      bottomTeamScore: entry.scoreB || '42',
      bracketName: entry.bracketName || '(Unnamed Bracket)',
      submitter: entry.entrant,
      transactionHash: entry.transactionHash,
      games: state.games.games.map(game => ({
        gameId: game.gameId,
        region: game.region,
        topSlotId: game.topSlotId,
        bottomSlotId: game.bottomSlotId,
        round: game.round,
        topTeam: state.teams.teamsById[entry.gamesByGameId[game.gameId].topTeamId],
        bottomTeam: state.teams.teamsById[entry.gamesByGameId[game.gameId].bottomTeamId],
        currentPickSlotId: entry.picksByGameId[game.gameId].slotId,
        gameResult: resultsByGameId[game.gameId]
      }))
    }
  };
}

const mapDispatchToProps = dispatch => ({
  loadAction: () => dispatch(Actions.loadEntries())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingContainer)
