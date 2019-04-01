
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
    default:
      return state;
  }
}

export default eventCacheComparison;
