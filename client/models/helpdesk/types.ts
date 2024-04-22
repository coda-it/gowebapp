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

export type Action = {
  type: string;
};

export type GetTicketAction = Action & Ticket;

export type GetAllTicketsAction = Action & {
  tickets: ReadonlyArray<Ticket>;
};
