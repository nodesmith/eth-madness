import { connect } from 'react-redux';
import * as Actions from '../actions';
import AdminPage from '../components/AdminPage';

const mapStateToProps = state => ({
  isLoading: !state.contract.hasLoadedAdminMetadata,
  allEntries: state.leaderboard.allEntries,
  ...state.contract.metadata
});

const mapDispatchToProps = dispatch => ({
  advanceContestState: (nextState) => dispatch(Actions.advanceContestState(nextState)),
  submitOracleVote: (oracleIndex, results, scoreA, scoreB) => dispatch(Actions.submitOracleVote(oracleIndex, results, scoreA, scoreB)),
  addOracle: (oracleAddress) => dispatch(Actions.addOracle(oracleAddress)),
  loadAction: () => dispatch(Actions.loadAdminMetadata()),
  claimTopEntry: (entryCompressed) => dispatch(Actions.claimTopEntry(entryCompressed)),
  closeOracleVoting: (results, scoreA, scoreB) => dispatch(Actions.closeOracleVoting(results, scoreA, scoreB)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)
