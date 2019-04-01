import * as ActionTypes from './actionTypes';

export const changePage = page => ({
  type: ActionTypes.CHANGE_PAGE,
  page
});


export const pickGame = (gameId, teamId, slotId) => {
  return {
    type: ActionTypes.PICK_GAME,
    gameId,
    teamId,
    slotId
  };
}

export const makeRandomPicks = () => ({type: ActionTypes.MAKE_RANDOM_PICKS});
export const changeBracketProperty = (propertyName, value) => ({type: ActionTypes.CHANGE_BRACKET_PROPERTY, propertyName, value});
export const clearPicks = () => ({type: ActionTypes.CLEAR_PICKS});
export const topSeedPicks = () => ({type: ActionTypes.TOP_SEED_PICKS});
// export const perfectPicks = () =>  ({type: ActionTypes.BOTTOM_TEAM_PICKS});
export const perfectPicks = () =>  ({type: ActionTypes.PERFECT_PICKS});

export const hideSubmitPicksDialog = (clearBracket) => ({type: ActionTypes.HIDE_SUBMIT_PICKS_DIALOG, clearBracket});
export const submitPicksToNetwork = (encodedPicks, topTeamScore, bottomTeamScore, message) => ({
  type: ActionTypes.SUBMIT_PICKS_TO_NETWORK,
  payload: {
    encodedPicks,
    topTeamScore,
    bottomTeamScore,
    message
  }
});

export const loadAdminMetadata = () => ({type: ActionTypes.LOAD_ADMIN_METADATA});
export const setContractMetadata = (metadata, isAdmin) => ({type: ActionTypes.SET_CONTRACT_METADATA, metadata, isAdmin})
export const advanceContestState = (nextState) => ({type: ActionTypes.ADVANCE_CONTEST_STATE, nextState});
export const submitOracleVote = (oracleIndex, results, scoreA, scoreB) => ({type: ActionTypes.SUBMIT_ORACLE_VOTE, oracleIndex, results, scoreA, scoreB});
export const addOracle = (oracleAddress) => ({type: ActionTypes.ADD_ORACLE, oracleAddress});
export const claimTopEntry = (entryCompressed) => ({type: ActionTypes.CLAIM_TOP_ENTRY, entryCompressed});
export const closeOracleVoting = (results, scoreA, scoreB) => ({type: ActionTypes.CLOSE_ORACLE_VOTING, results, scoreA, scoreB});

export const loadEntries = () => ({type: ActionTypes.LOAD_ENTRIES});
export const setEntries = (entries) => ({type: ActionTypes.SET_ENTRIES, entries});
export const changeSearch = (searchValue) => ({type: ActionTypes.CHANGE_SEARCH, searchValue});

export const picksSubmissionFailed = (reason) => ({type: ActionTypes.PICKS_SUBMISSION_FAILED, reason});
export const picksSubmittedSuccessfully = (transactionHash, entryIndex) => 
  ({type: ActionTypes.PICKS_SUBMITTED_SUCCESSFULLY, transactionHash, entryIndex});

export const loadingSourcesUpdate = (updateMessage) => ({
  type: ActionTypes.LOADING_SOURCES_UPDATE, updateMessage
});