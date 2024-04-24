import type * as utilTypes from 'client/utils/types';
import { call, put } from 'redux-saga/effects';
import type * as types from './types';
import * as constants from './constants';
import * as actions from './actions';
import * as alertActions from '../alerts/actions';
import * as alertConstants from '../alerts/constants';

async function callPostTicket(title: string, description: string) {
  const request = new Request(constants.HELPDESK_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
      status: constants.TICKET_STATUS_OPENED,
    }),
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Posting helpdesk ticket failed');
}

/* eslint-disable import/prefer-default-export */
export async function onCreateTicket({
  title,
  description,
}: types.GetTicketAction) {
  const response: utilTypes.HALResponse<types.Ticket, any, any> =
    await callPostTicket(title, description);
  const { shortHash } = response;

  window.location.href = `/helpdesk/${shortHash}`;
}

function callFetchTicket(id: string) {
  const request = new Request(`${constants.HELPDESK_ENDPOINT}/${id}`, {
    method: 'GET',
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetching helpdesk ticket failed');
}

/* eslint-disable import/prefer-default-export */
export function* onFetchTicket({ id }: types.GetTicketAction) {
  const response: utilTypes.HALResponse<types.Ticket, any, any> =
    yield callFetchTicket(id);

  yield put(
    actions.fetchTicketSuccess({
      id: response.id,
      title: response.title,
      description: response.description,
      shortHash: response.shortHash,
      status: response.status,
    })
  );
}

function callFetchAllTickets() {
  const request = new Request(`${constants.HELPDESK_ENDPOINT}`, {
    method: 'GET',
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetching helpdesk ticket failed');
}

/* eslint-disable import/prefer-default-export */
export function* onFetchAllTickets() {
  const response: utilTypes.HALResponse<
    { tickets: ReadonlyArray<types.Ticket> },
    any,
    any
  > = yield callFetchAllTickets();

  yield put(actions.fetchAllTicketsSuccess(response._embedded.tickets));
}

function callDeleteTicket(id: string) {
  const request = new Request(constants.HELPDESK_ENDPOINT, {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Removing helpdesk ticket failed');
}

export function* onDeleteTicket({
  id,
}: types.DeleteTicketAction): Iterable<any> {
  const response = yield call(callDeleteTicket, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchAllTickets());
}

function callUpdateTicket(ticket: types.Ticket) {
  const request = new Request(constants.HELPDESK_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify(ticket),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Updating category failed');
}

export function* onUpdateTicket({
  ticket,
}: types.UpdateTicketAction): Iterable<any> {
  const response = yield call(callUpdateTicket, ticket);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchAllTickets());
}
