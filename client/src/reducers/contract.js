import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  currentAccount: undefined,
  hasLoadedAdminMetadata: false,
  metadata: {
    networkId: undefined,
    contractAddress: undefined,
    currentState: undefined,
    transitionTimes: {},
    oracles: [],
    entriesCount: undefined,
  }
};

const contract = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CONTRACT_METADATA:
      const newState = Object.assign({}, state);
      newState.hasLoadedAdminMetadata = action.isAdmin || newState.hasLoadedAdminMetadata;
      for (const key in action.metadata) {
        newState.metadata[key] = action.metadata[key];
      }
      // newState.metadata = Object.assign(newState.metadata, action.metadata );
      return newState;
    default:
      return state;
  }
}

export default contract;