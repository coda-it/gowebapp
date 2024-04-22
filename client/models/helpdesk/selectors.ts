import * as globalTypes from 'client/types';
import * as types from './types';

export const getTicket = (state: globalTypes.State): types.Ticket =>
  state?.helpdesk?.ticket;

export const getTickets = (
  state: globalTypes.State
): ReadonlyArray<types.Ticket> => state?.helpdesk?.tickets;
