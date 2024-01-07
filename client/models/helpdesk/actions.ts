import * as actionTypes from './actionTypes';
import type * as types from './types';

export const createTicket = (
  title: string,
  description: string
): types.CreateTicketAction => ({
  type: actionTypes.CREATE_TICKET,
  title,
  description,
});

export const fetchTicket = (id: string) => ({
  type: actionTypes.FETCH_TICKET,
  id,
});

export const fetchTicketSuccess = (ticket: types.Ticket) => ({
  type: actionTypes.FETCH_TICKET_SUCCESS,
  ...ticket,
});
