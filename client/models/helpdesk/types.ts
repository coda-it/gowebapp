import * as actionTypes from './actionTypes';

export type CreateTicketAction = {};

export type Ticket = {
  id?: string;
  shortHash: string;
  title: string;
  description: string;
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

export type Action = GetTicketAction | GetAllTicketsAction;
