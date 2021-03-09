import { call, put } from 'redux-saga/effects';
import * as alertsActions from 'client/models/alerts/actions';
import * as alertsConstants from 'client/models/alerts/constants';
import * as constants from './constants';
import * as actions from './actions';
import type * as types from './types';

function callUser() {
  return fetch(constants.USER_ENDPOINT, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch(() => 'Fetching user data failed');
}

/* eslint-disable import/prefer-default-export */
export function* onFetchUser(): Iterable<any> {
  const user: types.ApiResponse = yield call(callUser);

  if (typeof user === 'object') {
    const mappedUser = {
      id: user.id,
      password: user.password,
      username: user.username,
      featureFlags: user._embedded.featureFlags,
    };

    yield put(actions.loadUser(mappedUser));
  } else {
    yield put(
      alertsActions.addAlert(
        'Fetching user data failed',
        alertsConstants.ALERT_TYPE_ERROR
      )
    );
  }
}
/* eslint-enable import/prefer-default-export */
