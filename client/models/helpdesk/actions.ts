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

export const fetchAllTickets = () => ({
  type: actionTypes.FETCH_ALL_TICKETS,
});

export const fetchAllTicketsSuccess = (
  tickets: ReadonlyArray<types.Ticket>
) => ({
  type: actionTypes.FETCH_ALL_TICKETS_SUCCESS,
  tickets,
});
