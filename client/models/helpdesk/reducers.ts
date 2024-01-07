import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.FETCH_TICKET_SUCCESS:
      return {
        ticket: {
          id: action.id,
          title: action.title,
          description: action.description,
        },
      };
    default:
      return state;
  }
}
