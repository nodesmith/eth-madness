import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  loadingSources: {
    nodesmith: {
      name: 'Nodesmith',
      startTime: -1,
      endTime: -1
    },
    infura: {
      name: 'Infura',
      startTime: -1,
      endTime: -1
    },
    metamask: {
      name: 'Metamask',
      startTime: -1,
      endTime: -1
    }
  }
};

const eventCacheComparison = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_SOURCES_UPDATE: {
      const { updateFor, startTime, endTime } = action.updateMessage;
      const newState = Object.assign({}, state);
      const newLoadingSources = newState.loadingSources;
      if (updateFor === 'nodesmith') {
        newLoadingSources.nodesmith.startTime = startTime;
        newLoadingSources.nodesmith.endTime = endTime;
      }
      if (updateFor === 'infura') {
        newLoadingSources.infura.startTime = startTime;
        newLoadingSources.infura.endTime = endTime;
      }

      return newState;
    }
    default:
      return state;
  }
}

export default eventCacheComparison;
