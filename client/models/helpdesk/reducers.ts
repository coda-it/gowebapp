import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {
  tickets: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.FETCH_TICKET_SUCCESS:
      return {
        ...state,
        ticket: {
          id: action.id,
          title: action.title,
          description: action.description,
        },
      };
    case actionTypes.FETCH_ALL_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.tickets,
      };
    default:
      return state;
  }
}
