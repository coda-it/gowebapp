import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState = {
  config: null,
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.FETCH_PLATFORM_SUCCESS:
      return {
        ...state,
        config: action.config,
      };
    default:
      return state;
  }
}
