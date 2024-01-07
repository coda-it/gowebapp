import * as globalTypes from 'client/types';
import * as types from './types';

/* eslint-disable import/prefer-default-export */
export const getTicket = (state: globalTypes.State): types.Ticket =>
  state?.helpdesk?.ticket;
/* eslint-enable import/prefer-default-export */
