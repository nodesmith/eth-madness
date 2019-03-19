import * as assert from 'assert';
import resultsByGameId from '../models/results.json';


const initialState = {
  numGames: 63,
  numRounds: 6,
  games: [],
  resultsByGameId
};

let gameId = 0;
for (let i = 1; i <= initialState.numRounds; i++) {
  const gamesInRound = 2 ** (initialState.numRounds - i);
  for (let j = 0; j < gamesInRound; j++, gameId++) {
    let region;
    const quarterOfRound = gamesInRound / 4;
    if (i >= initialState.numRounds - 1) {
      region = 'final_four'
    } else if (j < quarterOfRound * 1) {
      region = 'north_west';
    } else if (j < quarterOfRound * 2) {
      region = 'south_west';
    } else if (j < quarterOfRound * 3) {
      region = 'north_east';
    } else {
      region = 'south_east';
    }

    initialState.games.push({
      gameId,
      region,
      round: i,
      topSlotId: (gameId * 2),
      bottomSlotId: (gameId * 2) + 1
    })
  }
}

assert(initialState.games.length === initialState.numGames);

const games = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default games;
