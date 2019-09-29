// @flow
import { put } from 'redux-saga/effects';
import * as actions from './actions';

/* eslint-disable import/prefer-default-export */
export function* onApplicationMount(): Iterable<any> {
  yield put(actions.loaded());
}
/* eslint-enable import/prefer-default-export */
