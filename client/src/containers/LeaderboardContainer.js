import { connect } from 'react-redux';
import * as Actions from '../actions';
import Leaderboard from '../components/Leaderboard';

const mapStateToProps = state => ({
  entryCount: state.leaderboard.entryCount,
  searchValue: state.leaderboard.searchValue,
  data: state.leaderboard.displayedEntries.map(i => state.leaderboard.allEntries[i])
});

const mapDispatchToProps = dispatch => ({
  reloadEntries: () => dispatch(Actions.loadEntries()),
  changeSearch: (searchValue) => dispatch(Actions.changeSearch(searchValue))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard)
