import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as constants from './constants';
import type * as types from './types';

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
    .catch(() => 'Adding post failed');
}

/* eslint-disable import/prefer-default-export */
export function* onAddTranslation({
  key,
  value,
  language,
}: types.AddTranslationAction): Iterable<any> {
  const response = yield call(callAddTranslation, key, value, language);

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }
}
/* eslint-enable import/prefer-default-export */
