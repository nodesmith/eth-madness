import * as ActionTypes from '../actions/actionTypes';
import resultsByGameId from '../models/results.json';
import tournamentTeams from '../models/teams.json';
import { convertHexToBitString, convertEncodedPicksToByteArray, computeEncodedResults, deserializeHexPicks, getRoundForGameId, gamesByIdFromPicksById } from '../utils/converters';

import { createPicks } from '../utils/pickHelpers';
import { getContractInstance } from '../sagas';

const teamsById = tournamentTeams.reduce((prev, curr) => {
  prev[curr.teamId] = curr;
  return prev;
 },{});

const initialState = {
  allEntries: {},
  entryCount: -1,
  displayedEntries: [],
  sortBy: 'score',
  resultsByGameId,
  searchValue: ''
};

const scoreEntry = (entry, resultsByGameId) => {
  const picksByGameId = deserializeHexPicks(entry, teamsById);
  const gamesByGameId = gamesByIdFromPicksById(picksByGameId);
  let score = 0;
  const scoreByRound = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  for (const gameId in resultsByGameId) {
    const round = getRoundForGameId(gameId);
    const pick = picksByGameId[gameId];
    if (pick.teamId === resultsByGameId[gameId].winningTeamId) {
      const value = 2 ** (round - 1);
      scoreByRound[round] = (scoreByRound[round] || 0) + value;
      score += value;
    }
  }

  return { score, scoreByRound, picksByGameId, gamesByGameId } ;
}

const applySort = (allEntries, sortBy, searchValue) => {
  const entriesClone = allEntries.slice(0)

  for (let i = 0; i < entriesClone.length; i++) {
    entriesClone[i] = [entriesClone[i], i];
  }

  entriesClone.sort((left, right) => {
    if (right[0].score === left[0].score) {
      return left[0].entryIndex - right[0].entryIndex;
    }

    return right[0].score - left[0].score
  });

  const sortedIndices = [];

  for (let j = 0; j < entriesClone.length; j++) {
    sortedIndices.push(entriesClone[j][1]);
  }
  
  const filteredIndices = sortedIndices.filter(index => {
    if (!searchValue) {
      return true;
    }
    const entry = allEntries[index];
    return entry.bracketName.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0 || entry.entrant.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0;
  });

  return filteredIndices;
}

const leaderboard = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ENTRIES:
      const newState = Object.assign({}, state);
      newState.allEntries = action.entries.map(entry => {
        const { score, scoreByRound, picksByGameId, gamesByGameId } = scoreEntry(entry.picks, resultsByGameId);
        return {
          entrant: entry.entrant,
          score,
          scoreByRound,
          picksByGameId,
          gamesByGameId,
          bracketName: entry.message || '(Unnamed Bracket)',
          entryIndex: entry.entryIndex,
          scoreA: entry.scoreA,
          scoreB: entry.scoreB,
          transactionHash: entry.transactionHash,
          entryCompressed: entry.entryCompressed
        };
      });
      newState.entryCount = action.entries.length;
      newState.displayedEntries = applySort(newState.allEntries, newState.sortBy, newState.searchValue);
      return newState;
    case ActionTypes.CHANGE_SEARCH:
      return Object.assign({}, state, {
        searchValue: action.searchValue || '',
        displayedEntries: applySort(state.allEntries, state.sortBy, action.searchValue)
      })
    default:
      return state;
  }
}

export default leaderboard;