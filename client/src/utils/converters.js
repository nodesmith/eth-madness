
export const NUM_GAMES = 63;
export const NUM_TEAMS = 64;
export const NUM_ROUNDS = 6;


export const convertEncodedPicksToByteArray = (bitString) => {
  if (bitString.length % 8 !== 0) {
    throw new Error('Wrong size bit string');
  }

  const result = [];
  for (let i = 0; i < bitString.length; i += 8) {
    result.push(convertBitStringToNumber(bitString.substring(i, i + 8)));
  }

  return result;
}

const convertBitStringToNumber = (bits) => {
  if (bits.length !== 8) {
    throw new Error('Wrong size bit string');
  }

  let result = 0;
  for (let i = bits.length - 1; i >=0; i--) {
    const power = (bits.length - i) - 1;
    result += bits.charAt(i) * (2 ** power);
  }

  return result;
}

export const convertHexToBitString = (hexString, expectedLength) => {
  if (!hexString.startsWith('0x' || hexString.length < expectedLength + 2)) {
    throw new Error('Invalid hex')
  }

  const substring = hexString.substring(2, 2 + expectedLength);
  let result = '';
  for (let ni = 0; ni < substring.length; ni++) {
    const nibble = substring.charAt(ni);
    let remainingValue = parseInt(nibble, 16);
    for (let i = 0; i < 4; i++) {
      const divisor = 2 ** (3 - i);
      result += Math.floor(remainingValue / divisor).toString();
      remainingValue = remainingValue % divisor;
    }
  }

  return result;
}


const getRoundStartIndex = (round) => {
  if (round > NUM_ROUNDS) { 
    return -1;
  }

  let result = 0;
  for (let i = 1; i < round; i++) {
    result += 2 ** (NUM_ROUNDS - i);
  }

  return result;
}

export const getRoundForGameId = (gameId) => {
  for (let round = NUM_ROUNDS; round > 0; round--) {
    const roundStart = getRoundStartIndex(round);
    if (roundStart <= gameId) {
      return round;
    }
  }

  return NUM_ROUNDS;
}

export const getNextSlotId = (gameId) => {
  const round = getRoundForGameId(gameId);
  if (round > NUM_ROUNDS) {
    return -1;
  }

  const currentRoundStart = getRoundStartIndex(round);
  const indexInRound = gameId - currentRoundStart;
  const nextRoundStart = getRoundStartIndex(round + 1);
  return (nextRoundStart * 2) + indexInRound;
}


export const deserializeHexPicks = (hexPicks, teamsById) => {
  const numTeams = Object.keys(teamsById).length;
  const numGames = numTeams - 1;
  const bitString = convertHexToBitString(hexPicks, numTeams / 2);
  const picksByGameId = {};
  for (let gameId = 0; gameId < numGames; gameId++) {
    const bitIndex = (numGames * 2) - (gameId * 2);
    const bitTopTeam = bitString.charAt(bitIndex);
    const isTopTeam = bitTopTeam === '0';
    const round = getRoundForGameId(gameId);
    let teamId;
    
    // First round picks
    if (round === 1) {
      teamId = (gameId * 2) + (isTopTeam ? 0 : 1);
    } else {
      // Look back at the previous picks
      const roundStart = getRoundStartIndex(round);
      const indexInRound = gameId - roundStart;
      const previousRoundStart = getRoundStartIndex(round - 1);
      const topTeamPreviousGameId = previousRoundStart + (indexInRound * 2);
      const bottomTeamPreviousGameId = previousRoundStart + (indexInRound * 2) + 1;
      if (isTopTeam) {
        teamId = picksByGameId[topTeamPreviousGameId].teamId;
      } else {
        teamId = picksByGameId[bottomTeamPreviousGameId].teamId;
      }
    }

    const slotId = (gameId * 2) + (isTopTeam ? 0 : 1);
    picksByGameId[gameId] = {
      slotId,
      teamId
    }
  }

  return picksByGameId;
}

export const gamesByIdFromPicksById = (picksByGameId) => {
  const gameIds = Object.keys(picksByGameId).map(k => parseInt(k)).sort(((a, b) => a - b));
  const gamesById = {};
  for (let gameId of gameIds) {
    gamesById[gameId] = {};
  }

  for (let gameId of gameIds) {
    if (gameId < gameIds.length / 2) {
      gamesById[gameId] = {
        topTeamId: gameId * 2,
        bottomTeamId: (gameId * 2) + 1
      }
    }

    gamesById[gameId].winningTeamId = picksByGameId[gameId].teamId;

    // Propagate that team to the next round
    const nextGameSlotId = getNextSlotId(gameId);
    if (nextGameSlotId >= 0) {
      const nextGameGameId = Math.floor(nextGameSlotId / 2);
      if (nextGameSlotId % 2 === 0) {
        gamesById[nextGameGameId].topTeamId = picksByGameId[gameId].teamId;
      } else {
        gamesById[nextGameGameId].bottomTeamId = picksByGameId[gameId].teamId;
      }
    }
  }

  return gamesById;
}


/**
 * Converts a collection of picks into a binary representation of the compressed format the eth contract expects.
 * If their is not a complete set of picks, returns undefined.
 */
export const computeEncodedPicks = (picksByGameId) => {
  return computeEncodedResults(picksByGameId);
}

export const computeEncodedResults = (resultsByGameId) => {
  const gameIds = Object.keys(resultsByGameId).map(k => parseInt(k)).sort(((a, b) => b - a));
  if (gameIds.length !== NUM_GAMES) {
    return undefined;
  }

  // Game Ids should be sorted in reverse order
  if (gameIds[0] !== NUM_GAMES - 1 || gameIds[NUM_GAMES - 1]) {
    console.error('Unexpected array');
    return undefined;
  }

  // Bit 0 and 1 is always 0, then it goes in reverse order ending with game 0
  // [00, <game 62>, <game 61>, <game 60>, ... <game 1>, <game 0>]
  const bitList = gameIds.map((gameId) => resultsByGameId[gameId].slotId % 2 === 0 ? '01' : '10');
  bitList.unshift('00');
  return bitList.join('');
}
