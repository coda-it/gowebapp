export type CreateTicketAction = {};

export type Ticket = {
  id?: string;
  title: string;
  description: string;
};

export type State = {
  ticket?: Ticket;
};

export type Action = Ticket & {
  type: string;
};
