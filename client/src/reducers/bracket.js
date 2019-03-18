import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  viewingBracket: undefined,
};

const bracket = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      return Object.assign({}, state, { currentPage: action.page });
    default:
      return state;
  }
}

export default bracket;
