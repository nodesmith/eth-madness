import { NUM_GAMES, NUM_TEAMS, getNextSlotId } from './converters';

export const createPicks = (chooseTeamId) => {  
  const currentBracketByGameId = {};
  const picksByGameId = {};

  for (let i = 0; i < NUM_GAMES; i++) {
    currentBracketByGameId[i] = {
      topTeamId: ((i * 2) < NUM_TEAMS) ? (i * 2) : undefined,
      bottomTeamId: ((i * 2) < NUM_TEAMS) ? (i * 2) + 1 : undefined
    }
  }

  const gameIds = Object.keys(currentBracketByGameId).map(k => parseInt(k)).sort(((a, b) => a - b));
  for (let gameId of gameIds) {
    const currentGame = currentBracketByGameId[gameId];
    const teamId = chooseTeamId(gameId, currentGame);
    const slotId = (gameId * 2) + ((currentGame.topTeamId === teamId) ? 0 : 1);

    // Update the pick
    picksByGameId[gameId] = {
      teamId: teamId,
      slotId: slotId
    };

    // Propagate that team to the next round
    const nextGameSlotId = getNextSlotId(gameId);
    if (nextGameSlotId >= 0) {
      const nextGameGameId = Math.floor(nextGameSlotId / 2);
      if (nextGameSlotId % 2 === 0) {
        currentBracketByGameId[nextGameGameId].topTeamId = teamId;
      } else {
        currentBracketByGameId[nextGameGameId].bottomTeamId = teamId;
      }
    }
  }

  return { picksByGameId, currentBracketByGameId };
}

// const scoreViaContract = (entryPicksHex, resultsByGameId, expectedScore) => {
//   // First convert Our results into something which looks like the picks data structure
//   const { picksByGameId } = createPicks((gameId, game) => {
//     const isTopTeam = (resultsByGameId[gameId].winningTeamId === game.topTeamId);
//     return isTopTeam ? game.topTeamId : game.bottomTeamId;
//   });

//   const resultsBitString = computeEncodedResults(picksByGameId);
//   const resultsHexArray = convertEncodedPicksToByteArray(resultsBitString);

//   const picksBitString = convertHexToBitString(entryPicksHex, 32);
//   const picksHexArray = convertEncodedPicksToByteArray(picksBitString);

//   const { contractInstance } = getContractInstance();
//   contractInstance.methods.scoreEntry(picksHexArray, resultsHexArray).call().then((r) => {
//     console.log(`Score: ${r} Expected: ${expectedScore}`);
//   })
  
// }