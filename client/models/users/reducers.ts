import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState = {
  isLoading: true,
  user: null,
};

export default function reducers(state: types.State = defaultState, action: types.Action) {
  const { user, error } = action;

  switch (action.type) {
    case actionTypes.FETCH_USER:
      return { ...state, isLoading: true };

    case actionTypes.LOAD_USER:
      return { ...state, user, isLoading: false };

    case actionTypes.FETCH_USER_FAILURE:
      return { ...state, error, isLoading: false };

    default:
      return state;
  }
}
