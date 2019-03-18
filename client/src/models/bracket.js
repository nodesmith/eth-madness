

// export class Bracket {
//   constructor(games, numRounds) {
//     if (games.length !== (2 ** numRounds) - 1) {
//       throw new Error(`Wrong number of games ${games.length} for num round ${numRounds}`);
//     }

//     this.games = games;
//     this.numRounds = numRounds;
//   }
// }

const getRoundStartIndex = (round) => {
  if (round > 6) { 
    return -1;
  }

  let result = 0;
  for (let i = 1; i < round; i++) {
    result += 2 ** (6 - i);
  }

  return result;
}

const getNextPickId = (games, gameId) => {
  if (games[gameId].round >= 6) {
    return -1;
  }

  const currentRoundStart = getRoundStartIndex(games[gameId].round);
  const indexInRound = gameId - currentRoundStart;
  const nextRoundStart = getRoundStartIndex(games[gameId].round + 1);
  return (nextRoundStart * 2) + indexInRound;
}

export const updatePick = (games, gameId, teamId) => {
  const updatedGames = games.slice(0);
  const updatedGame = updatedGames[gameId];
  const oldTeamId = updatedGame.pick;
  updatedGame.pick = teamId;

  let team = undefined;
  if (updatedGame.top.teamId === teamId) {
    team = updatedGame.top;
  } else if (updatedGame.bottom.teamId === teamId) {
    team = updatedGame.bottom;
  }

  // Go through and clear out anywhere we see the old team id picked in the future
  let currGame = updatedGame;
  while (!!currGame) {

    let nextPickId = getNextPickId(games, currGame.gameId);
    if (nextPickId < 0) {
      break;
    }
    const nextGame = games[Math.floor(nextPickId / 2)];

    if (nextGame.pick === oldTeamId) {
      nextGame.pick = undefined;
      if (nextGame.top.teamId === oldTeamId) {
        nextGame.top = currGame;
      } else if (nextGame.bottom.teamId === oldTeamId) {
        nextGame.bottom = currGame;
      }
    }

    currGame = nextGame;
  }

  // for (let i = gameId + 1; i < games.length; i++) {
  //   if (games[i].pick === oldTeamId) {
  //     games[i].pick = undefined;
  //     if (games[i].top.teamId === oldTeamId) {
  //       games[i].top = {

  //       }
  //     }
  //   }
  // }

  // Mark our team as the winner of the next game
  const nextPickId = getNextPickId(games, gameId);
  if (nextPickId < 0) {

  } else {
    const nextGame = games[Math.floor(nextPickId / 2)];
    if (nextPickId % 2 === 0) {
      nextGame.top = team
    } else {
      nextGame.bottom = team;
    }
  }
  

  return updatedGames;
}

export const bracketFromTeams = (teams) => {
  let lengthCheck = teams.length;
  let numRounds = 0;
  while (lengthCheck > 1) {
    if (lengthCheck % 2 !== 0) {
      throw new Error('Team length not a power of 2');
    }

    lengthCheck /= 2;
    numRounds++;
  }

  const games = [];
  let gameId = 0;
  for (let i = 0; i < teams.length - 1; i += 2) {
    games.push({
      gameId: gameId,
      top: teams[i],
      bottom: teams[i + 1],
      pick: undefined,
      round: 1
    });

    gameId++;
  }

  let parentGameId = 0;
  for (let round = 2; round <= numRounds; round++) {
    const gamesInRound = 2 ** (numRounds - round);
    for (let i = 0; i < gamesInRound; i++, gameId++, parentGameId += 2) {
      const nextTop = games[parentGameId];
      const nextBottom = games[parentGameId + 1];

      games.push({
        gameId: gameId,
        top: nextTop,
        bottom: nextBottom,
        pick: undefined,
        round: round
      });
    }
  }

  return games;
}

// const generateEmptyBracket = (numRounds) => {
//   const games = [];
//   const roundStartGame = 0;
//   for (let round = 0; i < numRounds; i++) {
//     for (let gameInRound = 0; gameInRound < 2 ** (numRounds - round); gameInRound++) {
//       const gameId = roundStartGame + gameInRound;
//       games.push({
//         gameId: gameId,
//         teamA: {

//         },
//         teamB: undefined,
//         pick: undefined
//       });
//     }

//     roundStartGame += 2 ** (numRounds - round);
//   }


// }
