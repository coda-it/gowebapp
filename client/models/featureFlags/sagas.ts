import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as constants from './constants';
import type * as types from './types';
import * as actions from './actions';

function callAddFeatureFlag(key, value) {
  const request = new Request(constants.FEATURE_FLAGS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      key,
      value,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Adding feature flag failed');
}

export function* onAddFeatureFlag({
  key,
  value,
}: types.AddFeatureFlagAction): Iterable<any> {
  const response = yield call(callAddFeatureFlag, key, value);

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchFeatureFlags());
}

export function callFetchFeatureFlags() {
  const request = new Request(constants.FEATURE_FLAGS_ENDPOINT, {
    method: 'GET',
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetch feature flags failed');
}

export function* onFetchFeatureFlags(): Iterable<any> {
  const response: types.ApiResponse = yield call(callFetchFeatureFlags);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const featureFlags = response?._embedded?.featureFlags || [];

  yield put(actions.fetchFeatureFlagsSuccess(featureFlags));
}

function callUpdateFeatureFlag(id: string, key: string, value: boolean) {
  const request = new Request(constants.FEATURE_FLAGS_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      key,
      value,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Updating feature flag failed');
}

export function* onUpdateFeatureFlag({
  id,
  key,
  value,
}: types.UpdateFeatureFlagAction): Iterable<any> {
  const response = yield call(callUpdateFeatureFlag, id, key, value);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchFeatureFlags());
}

function callDeleteFeatureFlag(id: string) {
  const request = new Request(constants.FEATURE_FLAGS_ENDPOINT, {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Removing feature flag failed');
}

export function* onDeleteFeatureFlag({
  id,
}: types.DeleteFeatureFlagAction): Iterable<any> {
  const response = yield call(callDeleteFeatureFlag, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchFeatureFlags());
}
