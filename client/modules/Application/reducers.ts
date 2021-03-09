import * as actionTypes from './actionTypes';
import type * as types from './types';

type State = {
  isLoaded: boolean;
};

const defaultState = {
  isLoaded: false,
};

export default function reducers(
  state: State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.LOADED:
      return { ...state, isLoaded: true };
    default:
      return state;
  }
}
