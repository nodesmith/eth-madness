import { connect } from 'react-redux';
import * as Actions from '../actions';
import SubmitPicksDialog from '../components/SubmitPicksDialog';

const mapStateToProps = state => ({
  isDialogShowing: state.submitPicks.isDialogShowing,
  encodedPicks: state.picks.encodedPicks,
  submissionStatus: state.submitPicks.submissionStatus,
  location: state.router.location
});

const mapDispatchToProps = dispatch => ({
  hideSubmitPicksDialog: (clearBracket) => dispatch(Actions.hideSubmitPicksDialog(clearBracket)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitPicksDialog)
