import tournamentTeams from '../models/teams.json';

const initialState = {
  numTeams: 64,
  teams: tournamentTeams,
  teamsById: tournamentTeams.reduce((prev, curr) => {
    prev[curr.teamId] = curr;
    return prev;
   },{} )
};

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
