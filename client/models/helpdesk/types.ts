import * as actionTypes from './actionTypes';
import * as constants from './constants';

export type CreateTicketAction = {};

export type TicketStatus = (typeof constants.TICKET_STATUSES)[number];

export type Ticket = {
  id?: string;
  shortHash: string;
  title: string;
  description: string;
  status: TicketStatus;
};

export type State = {
  ticket?: Ticket;
  tickets: ReadonlyArray<Ticket>;
};

export type GetTicketAction = Ticket & {
  type: typeof actionTypes.FETCH_TICKET_SUCCESS;
};

export type GetAllTicketsAction = {
  type: typeof actionTypes.FETCH_ALL_TICKETS_SUCCESS;
  tickets: ReadonlyArray<Ticket>;
};

export type DeleteTicketAction = {
  type: typeof actionTypes.DELETE_TICKET;
  id: string;
};

export type UpdateTicketAction = {
  type: typeof actionTypes.UPDATE_TICKET;
  ticket: Ticket;
};

export type Action = GetTicketAction | GetAllTicketsAction;
