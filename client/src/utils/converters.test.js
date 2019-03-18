import { deserializeHexPicks, computeEncodedResults, computeEncodedPicks, convertEncodedPicksToByteArray, convertHexToBitString, NUM_GAMES, NUM_TEAMS, NUM_ROUNDS } from './converters';
import results from '../models/results.2017.json';
import tournamentTeams from '../models/teams.2017.json';
import { createPicks } from './pickHelpers';

const gameIds = [];
for (let i = 0; i < NUM_GAMES; i++) {
  gameIds.push(i);
}

const teamsById = tournamentTeams.reduce((prev, curr) => {
  prev[curr.teamId] = curr;
  return prev;
},{});


it('Encode all top team Picks', () => {

  const allTopTeamPicks = gameIds.reduce((prev, gameId) => {
    prev[gameId] = {
      slotId: gameId * 2
    }
    return prev;
  }, {});

  const encodedPicks = computeEncodedPicks(allTopTeamPicks);
  const expectedResult = Array.from(Array(NUM_TEAMS)).map(i => "0").join("");
  expect(encodedPicks).toEqual(expectedResult);
});


it('Test Round Trips', () => {
  const { picksByGameId, currentBracketByGameId } = createPicks((gameId, game) => {

    return game.bottomTeamId;
  });
  const allBottomTeamPicks = picksByGameId;

  const encodedPicks = computeEncodedPicks(allBottomTeamPicks);
  const expectedResult = Array.from(Array(NUM_TEAMS)).map(i => "1").join("").replace("1", "0", 1);
  expect(encodedPicks).toEqual(expectedResult);

  const hexArray = convertEncodedPicksToByteArray(encodedPicks);
  const expectedHexArray = Array.from(Array(NUM_TEAMS / 8)).map(i => 255);
  expectedHexArray[0] = 127;
  expect(hexArray).toEqual(expectedHexArray);

  const hexString = "0x" + expectedHexArray.map(val => val.toString(16)).join("");
  const reconvertedHexString = convertHexToBitString(hexString, 16);
  expect(reconvertedHexString).toEqual(encodedPicks);

  const deserializedPicks = deserializeHexPicks(hexString, teamsById);
  expect(Object.keys(deserializedPicks).map(p => deserializedPicks[p].slotId))
    .toEqual(Object.keys(allBottomTeamPicks).map(p => allBottomTeamPicks[p].slotId));
});


it('Test encoding results', () => {

  const { picksByGameId, currentBracketByGameId } = createPicks((gameId, game) => {
    const isTopTeam = (results[gameId].winningTeamId === game.topTeamId);
    return isTopTeam ? game.topTeamId : game.bottomTeamId;
  });
  
  computeEncodedResults(picksByGameId);

});




it('Test 2017 Bracket', () => {
  const { picksByGameId, currentBracketByGameId } = createPicks((gameId, game) => {
    return results[gameId].winningTeamId;
  });

  const encodedPicks = computeEncodedPicks(picksByGameId);
  const hexArray = convertEncodedPicksToByteArray(encodedPicks);
  const hexString = "0x" + hexArray.map(val => val.toString(16)).join("");
  

  const deserializedPicks = deserializeHexPicks(hexString, teamsById);
  expect(Object.keys(deserializedPicks).map(p => deserializedPicks[p].slotId))
    .toEqual(Object.keys(picksByGameId).map(p => picksByGameId[p].slotId));
});
