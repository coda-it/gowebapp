import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {
  tickets: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  let typedAction;

  switch (action.type) {
    case actionTypes.FETCH_TICKET_SUCCESS:
      typedAction = action as types.GetTicketAction;

      return {
        ...state,
        ticket: {
          id: typedAction.id,
          title: typedAction.title,
          description: typedAction.description,
        },
      };
    case actionTypes.FETCH_ALL_TICKETS_SUCCESS:
      typedAction = action as types.GetAllTicketsAction;

      return {
        ...state,
        tickets: typedAction.tickets,
      };
    default:
      return state;
  }
}
