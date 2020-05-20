// @flow
import * as actionTypes from './actionTypes';

const defaultState = {
  isLoading: true,
  user: null,
};

export default function reducers(state: Object = defaultState, action: Object) {
  const { user, error } = action;

  switch (action.type) {
    case actionTypes.FETCH_USER:
      return Object.assign({}, state, { isLoading: true });

    case actionTypes.LOAD_USER:
      return Object.assign({}, state, { user, isLoading: false });

    case actionTypes.FETCH_USER_FAILURE:
      return Object.assign({}, state, { error, isLoading: false });

    default:
      return state;
  }
}
