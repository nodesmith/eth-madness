import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  currentPage: 'home'
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      return Object.assign({}, state, { currentPage: action.page });
    default:
      return state;
  }
}

export default navigation;