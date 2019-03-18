import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  isDialogShowing: false,
  userEmail: '',
  receiveUpdates: false,
  submissionStatus: {
    state: 'pending'
  }
};

const submitPicks = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUBMIT_PICKS_TO_NETWORK:
      return Object.assign({}, state, { 
        isDialogShowing: true,
        submissionStatus: {
          state: 'pending'
        }
      });
    case ActionTypes.PICKS_SUBMISSION_FAILED: {
      return Object.assign({}, state, {
        submissionStatus: {
          state: 'failed',
          message: action.reason
        }
      });
    }
    case ActionTypes.PICKS_SUBMITTED_SUCCESSFULLY: {
      return Object.assign({}, state, {
        submissionStatus: {
          state: 'succeeded',
          transactionHash: action.transactionHash,
          bracketId: action.entryIndex
        }
      });
    }

    case ActionTypes.HIDE_SUBMIT_PICKS_DIALOG:
      return Object.assign({}, state, { isDialogShowing: false });
    default:
      return state;
  }
}

export default submitPicks;