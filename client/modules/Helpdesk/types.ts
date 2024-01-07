import type * as helpdeskTypes from 'client/models/helpdesk/types';

export type OwnProps = {
  isAdmin?: boolean;
  match: {
    params: {
      id?: string;
    };
  };
};

export type Props = {
  createTicket: (title: string, description: string) => void;
  fetchTicket: (id: string) => void;
  id?: string;
  ticket?: helpdeskTypes.Ticket;
};
