import * as ActionTypes from '../actions/actionTypes';
import resultsByGameId from '../models/results.json';
import { computeEncodedPicks, getNextSlotId, NUM_GAMES, NUM_TEAMS } from '../utils/converters';
import * as PickHelpers from '../utils/pickHelpers';
import faker from 'faker';
import tournamentTeams from '../models/teams.json';

const buildInitialState = (isEditing, bracketName) => {
  const initialState = {
    isEditing,
    bracketName,
    teamAScore: '',
    teamBScore: '',
    picksByGameId: {},
    currentBracketByGameId: {},
    encodedPicks: undefined
  };
  
  for (let i = 0; i < NUM_GAMES; i++) {
    initialState.currentBracketByGameId[i] = {
      topTeamId: ((i * 2) < NUM_TEAMS) ? (i * 2) : undefined,
      bottomTeamId: ((i * 2) < NUM_TEAMS) ? (i * 2) + 1 : undefined
    }
  }

  return initialState;
}

const stateKey = 'PICKS_0.42';

const savePickState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem(stateKey, serializedState);
  } catch(e) {
    console.log(e);
  }
}

const loadPickState = () => {
  try {
    const serializedState = window.localStorage.getItem(stateKey);
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
  }
}

const clearPickState = () => {
  try {
    window.localStorage.removeItem(stateKey);
  } catch(e) {
    console.log(e);
  }
}

const initialState = loadPickState() || buildInitialState(true, '');

const updateEncodedPicks = (state) => {
  state.encodedPicks = computeEncodedPicks(state.picksByGameId);
  savePickState(state);
}


const picks = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PICK_GAME: {
      const newState = Object.assign({}, state);
      const oldPick = newState.picksByGameId[action.gameId];


      if (typeof action.teamId !== 'undefined') {
        newState.picksByGameId[action.gameId] = {
          teamId: action.teamId,
          slotId: action.slotId
        };
      
        const updatedGame = newState.currentBracketByGameId[action.gameId];
        if (action.slotId % 2 === 0) {
          updatedGame.topTeamId = action.teamId;
        } else {
          updatedGame.bottomTeamId = action.teamId
        }
      } else {
        // Case where we are clearing out a pick
         delete newState.picksByGameId[action.gameId];
      }

      // Propagate forward any implications of this change
      // Go through and clear out anywhere we see the old team id picked in the future
      let currGameId = action.gameId;
      while (currGameId >= 0) {

        let nextSlotId = getNextSlotId(currGameId);
        if (nextSlotId < 0) {
          break;
        }

        const nextGameId = Math.floor(nextSlotId / 2);
        if (typeof oldPick !== 'undefined') {
          // Get the next game and clear out 
          if (nextSlotId % 2 === 0 && newState.currentBracketByGameId[nextGameId].topTeamId === oldPick.teamId) {
            newState.currentBracketByGameId[nextGameId].topTeamId = undefined;
          } 
          if (nextSlotId % 2 === 0 && newState.currentBracketByGameId[nextGameId].bottomTeamId === oldPick.teamId) {
            newState.currentBracketByGameId[nextGameId].bottomTeamId = undefined;
          }

          // Clear out this pick if it was made
          const nextGamePick = newState.picksByGameId[nextGameId];
          if (nextGamePick && nextGamePick.teamId === oldPick.teamId) {
            delete newState.picksByGameId[nextGameId];
          }
        }

        currGameId = nextGameId;
      }

      // Add this team to the next game in the bracket
      const nextGameSlotId = getNextSlotId(action.gameId);
      const nextGameGameId = Math.floor(nextGameSlotId / 2);
      if (nextGameSlotId >= 0) {
        if (nextGameSlotId % 2 === 0) {
          newState.currentBracketByGameId[nextGameGameId].topTeamId = action.teamId;
        } else {
          newState.currentBracketByGameId[nextGameGameId].bottomTeamId = action.teamId;
        }
      }

      updateEncodedPicks(newState);
      return newState;
    }
    case ActionTypes.CLEAR_PICKS:
      clearPickState();
      return buildInitialState(state.isEditing, '');

    case ActionTypes.HIDE_SUBMIT_PICKS_DIALOG:
      if (action.clearBracket) {
        clearPickState();
        return buildInitialState(state.isEditing, '');
      } else {
        return state;
      }
    case ActionTypes.MAKE_RANDOM_PICKS: {
      // Start by just clearing out the picks
      const newState = buildInitialState(state.isEditing, faker.random.words(3));
      const gameIds = Object.keys(newState.currentBracketByGameId).map(k => parseInt(k)).sort(((a, b) => a - b));
      for (let gameId of gameIds) {
        const currentGame = newState.currentBracketByGameId[gameId];
        let slotId, teamId;

        // Pick a winner
        if (Math.random() < 0.5) {
          slotId = (gameId * 2) + 0;
          teamId = currentGame.topTeamId;
        } else {
          slotId = (gameId * 2) + 1;
          teamId = currentGame.bottomTeamId;
        }
      
        // Update the pick
        newState.picksByGameId[gameId] = {
          teamId: teamId,
          slotId: slotId
        };

        // Propagate that team to the next round
        const nextGameSlotId = getNextSlotId(gameId);
        if (nextGameSlotId >= 0) {
          const nextGameGameId = Math.floor(nextGameSlotId / 2);
          if (nextGameSlotId % 2 === 0) {
            newState.currentBracketByGameId[nextGameGameId].topTeamId = teamId;
          } else {
            newState.currentBracketByGameId[nextGameGameId].bottomTeamId = teamId;
          }
        }
      }

      newState.teamAScore = (50 + Math.floor(50 * Math.random())).toString();
      newState.teamBScore = (50 + Math.floor(50 * Math.random())).toString();
      if (newState.teamAScore === newState.teamBScore) {
        newState.teamBScore++;
      }

      updateEncodedPicks(newState);
      return newState;
    }
    case ActionTypes.TOP_SEED_PICKS: {

      const newState = buildInitialState(state.isEditing, faker.random.words(3));

      const { picksByGameId, currentBracketByGameId } = PickHelpers.createPicks((gameId, currentGame) => {
        const topTeamSeed = tournamentTeams[currentGame.topTeamId].seed;
        const bottomTeamSeed = tournamentTeams[currentGame.bottomTeamId].seed;
        if (topTeamSeed < bottomTeamSeed) {
          return currentGame.topTeamId;
        } else if (bottomTeamSeed < topTeamSeed) {
          return currentGame.bottomTeamId;
        } else {
          return (Math.random() < 0.5) ? currentGame.topTeamId : currentGame.bottomTeamId;
        }
      });

      newState.picksByGameId = picksByGameId;
      newState.currentBracketByGameId = currentBracketByGameId;
      newState.teamAScore = (50 + Math.floor(50 * Math.random())).toString();
      newState.teamBScore = (50 + Math.floor(50 * Math.random())).toString();
      newState.bracketName = faker.random.words(3);

      updateEncodedPicks(newState);
      return newState;
    }
    case ActionTypes.PERFECT_PICKS: {
      // Helper to get what we consider perfect picks for testing
      const newState = buildInitialState(state.isEditing, faker.random.words(3));
      const gameIds = Object.keys(newState.currentBracketByGameId).map(k => parseInt(k)).sort(((a, b) => a - b));
      for (let gameId of gameIds) {
        const gameResult = resultsByGameId[gameId];
        const teamId = gameResult.winningTeamId;
        const slotId = (gameId * 2) + ((gameResult.winningTeamId === gameResult.topTeamId) ? 0 : 1);
      
        // Update the pick
        newState.picksByGameId[gameId] = {
          teamId: teamId,
          slotId: slotId
        };

        newState.currentBracketByGameId[gameId].topTeamId = gameResult.topTeamId;
        newState.currentBracketByGameId[gameId].bottomTeamId = gameResult.bottomTeamId;
      }

      newState.teamAScore = resultsByGameId[gameIds[gameIds.length - 1]].topTeamScore;
      newState.teamBScore = resultsByGameId[gameIds[gameIds.length - 1]].bottomTeamScore;

      updateEncodedPicks(newState);
      return newState;
    }
    case ActionTypes.CHANGE_BRACKET_PROPERTY: {
      switch (action.propertyName) {
        case 'teamA':
          return Object.assign({}, state, {
            teamAScore: action.value.replace(/\D/g,'')
          });
        case 'teamB':
          return Object.assign({}, state, {
            teamBScore: action.value.replace(/\D/g,'')
          });
        case 'bracketName':
          return Object.assign({}, state, {
            bracketName: action.value
          });
        default:
          throw new Error('unknown bracket property ' + action.propertyName);
      }
    }
    // case ActionTypes.BOTTOM_TEAM_PICKS: {
    //   // Start by just clearing out the picks
    //   const newState = buildInitialState(state.isEditing, state.bracketName);
    //   const gameIds = Object.keys(newState.currentBracketByGameId).map(k => parseInt(k)).sort(((a, b) => a - b));
    //   for (let gameId of gameIds) {
    //     const currentGame = newState.currentBracketByGameId[gameId];
    //     const teamId = currentGame.bottomTeamId;
    //     const slotId = (gameId * 2) + 1;

    //     // Update the pick
    //     newState.picksByGameId[gameId] = {
    //       teamId: teamId,
    //       slotId: slotId
    //     };

    //     // Propagate that team to the next round
    //     const nextGameSlotId = getNextSlotId(gameId);
    //     if (nextGameSlotId >= 0) {
    //       const nextGameGameId = Math.floor(nextGameSlotId / 2);
    //       if (nextGameSlotId % 2 === 0) {
    //         newState.currentBracketByGameId[nextGameGameId].topTeamId = teamId;
    //       } else {
    //         newState.currentBracketByGameId[nextGameGameId].bottomTeamId = teamId;
    //       }
    //     }
    //   }

    //   newState.teamAScore = 50 + Math.floor(50 * Math.random());
    //   newState.teamBScore = 50 + Math.floor(50 * Math.random());
    //   if (newState.teamAScore === newState.teamBScore) {
    //     newState.teamBScore++;
    //   }

    //   updateEncodedPicks(newState);
    //   return newState;
    // }
    default:
      return state;
  }
}

export default picks;
