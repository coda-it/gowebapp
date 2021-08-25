import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as actions from './actions';
import * as constants from './constants';
import type * as types from './types';

export function callFetchPlatform() {
  const request = new Request(constants.PLATFORM_ENDPOINT, {
    method: 'GET',
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetch platform config failed');
}

export function* onFetchPlatform() {
  const response: types.ApiResponse = yield call(callFetchPlatform);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const platformConfig = response?.config || null;
  yield put(actions.fetchPlatformSuccess(platformConfig));
}

export function callUpdatePlatform(config: types.PlatformConfig) {
  const request = new Request(constants.PLATFORM_ENDPOINT, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...config,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Update platform config failed');
}

export function* onUpdatePlatform({ config }: types.Action) {
  const response: types.ApiResponse = yield call(callUpdatePlatform, config);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }
}

export function callAddPlatform(config: types.PlatformConfig) {
  const request = new Request(constants.PLATFORM_ENDPOINT, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...config,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Add platform config failed');
}

export function* onAddPlatform({ config }: types.Action) {
  const response: types.ApiResponse = yield call(callAddPlatform, config);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchPlatformSuccess(response?.config));
}
