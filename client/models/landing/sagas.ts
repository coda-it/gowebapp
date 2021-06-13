import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as actions from './actions';
import * as constants from './constants';
import type * as types from './types';

export function callFetchLanding() {
  const request = new Request(constants.LANDING_ENDPOINT, {
    method: 'GET',
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetch landing page failed');
}

export function* onFetchLanding() {
  const response: types.ApiResponse = yield call(callFetchLanding);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const landingModule = response?.config?.landingModule || null;
  const id = response?.config?.id || null;
  yield put(actions.fetchLandingSuccess(landingModule, id));
}

export function callUpdateLanding(input: string, id: string) {
  const request = new Request(constants.LANDING_ENDPOINT, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      landingModule: input,
      id,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Update landing page failed');
}

export function* onUpdateLanding({ input, id }: types.UpdateLandingAction) {
  const response: types.ApiResponse = yield call(callUpdateLanding, input, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }
}

export function callAddLanding(input: string) {
  const request = new Request(constants.LANDING_ENDPOINT, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      landingModule: input,
    }),
  });

  return fetch(request)
    .then((response) => response.json())

    .catch(() => 'Add landing page failed');
}

export function* onAddLanding({ input }: types.AddLandingAction) {
  const response: types.ApiResponse = yield call(callAddLanding, input);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const landingModule = response?.config?.landingModule;
  const id = response?.config?.id;
  yield put(actions.fetchLandingSuccess(landingModule, id));
}
