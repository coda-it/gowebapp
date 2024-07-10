import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as constants from './constants';
import type * as types from './types';
import * as actions from './actions';

function callAddTranslation(key, value, language) {
  const request = new Request(constants.TRANSLATION_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      key,
      value,
      language,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Adding translation failed');
}

export function* onAddTranslation({
  key,
  value,
  language,
}: types.AddTranslationAction): Iterable<any> {
  const response = yield call(callAddTranslation, key, value, language);

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchTranslations());
}

export function callFetchTranslations() {
  const request = new Request(constants.TRANSLATION_ENDPOINT, {
    method: 'GET',
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetch translations failed');
}

export function* onFetchTranslations(): Iterable<any> {
  const response: types.ApiResponse = yield call(callFetchTranslations);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const translations = response?._embedded?.translations || [];
  yield put(actions.fetchTranslationsSuccess(translations));
}

function callUpdateTranslation(
  id: string,
  key: string,
  value: string,
  language: string
) {
  const request = new Request(constants.TRANSLATION_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      key,
      value,
      language,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Updating translation failed');
}

export function* onUpdateTranslation({
  id,
  key,
  value,
  language,
}: types.UpdateTranslationAction): Iterable<any> {
  const response = yield call(callUpdateTranslation, id, key, value, language);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(actions.fetchTranslations());
}
