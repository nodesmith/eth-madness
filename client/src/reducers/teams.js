import tournamentTeams from '../models/teams.json';

const initialState = {
  numTeams: 64,
  teamsById: {},
  teams: tournamentTeams,
  teamsById: tournamentTeams.reduce((prev, curr) => {
    prev[curr.teamId] = curr;
    return prev;
   },{} )
};

// for (const t of tournamentTeams)
// for (let i = 0; i < initialState.numTeams; i++) {
//   initialState.teamsById[i] = {
//     teamId: i,
//     teamName: `Team ${i}`
//   };

//   initialState.teams.push(i);
// }

initialState.teamsById[undefined] = {
  teamId: undefined,
  teamName: ''
};

const teams = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default teams;
