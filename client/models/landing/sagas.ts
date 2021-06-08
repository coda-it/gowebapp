import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as actions from './actions';
import * as constants from './constants';
import type * as types from './types';
import * as landingSelectors from 'client/models/landing/selectors';

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

export function callUpdateLanding(input) {
  console.log('callUpdate', input)
  const request = new Request(constants.LANDING_ENDPOINT, {
    method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        landingModule: input.input,
        id,
      }),
  });

    return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Updating landing page failed');
  }

  export function* onUpdateLanding(input) {
      const response: types.ApiResponse = yield call(callUpdateLanding, input);

      if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
      }}


export function callAddLanding(input) {
  console.log('callAdd', input)
  const request = new Request(constants.LANDING_ENDPOINT, {
   method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        landingModule: input.input,
      }),
  });

    return fetch(request)
    .then((response) => response.json())
    .then((data) => console.log('data', data))
    .catch((e) => console.log(e));
  }

  export function* onAddLanding(input) {
      const response: types.ApiResponse = yield call(callAddLanding, input);
      yield console.log('response ADD', response)

     // if (typeof response === 'string') {
    //yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    //return;
     // }
     
        // const landingModule = 'state test';
        //  const id = 'state id test';
      //  yield put(actions.fetchLandingSuccess(landingModule, id));
    }


 


