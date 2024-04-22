import type * as utilTypes from 'client/utils/types';
import { put } from 'redux-saga/effects';
import type * as types from './types';
import * as constants from './constants';
import * as actions from './actions';

async function callPostTicket(title: string, description: string) {
  const request = new Request(constants.HELPDESK_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
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
