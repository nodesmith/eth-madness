import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  loadingSources: {
    nodesmith: {
      name: 'Nodesmith',
      durationMs: 0,
      isRunning: false
    },
    infura: {
      name: 'Infura',
      durationMs: 0,
      isRunning: false
    },
    metamask: {
      name: 'Metamask',
      durationMs: 0,
      isRunning: true
    }
  }
};

const eventCacheComparison = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_SOURCES_UPDATE: {
      const { elapsedMs, infuraDone, nodesmithDone } = action.updateMessage;
      const newState = Object.assign({}, state);
      const newLoadingSources = newState.loadingSources;
      newLoadingSources.nodesmith.isRunning = !nodesmithDone;
      if (!nodesmithDone) {
        newLoadingSources.nodesmith.durationMs = elapsedMs;
      }

      newLoadingSources.infura.isRunning = !infuraDone;
      if (!infuraDone) {
        newLoadingSources.infura.durationMs = elapsedMs;
      }

      return newState;
    }
    default:
      return state;
  }
}

export default eventCacheComparison;
