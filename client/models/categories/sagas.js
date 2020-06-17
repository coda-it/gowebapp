// @flow
import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as actions from './actions';
import * as constants from './constants';

function callAddCategory(name: string) {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Adding category failed');
}

export function* onAddCategory({ name }: { name: string }): Iterable<any> {
  const response = yield call(callAddCategory, name);

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }

  window.location.href = '/admin/categories';
}

function callUpdateCategory(name: string, id: string) {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      name,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Updating category failed');
}

export function* onUpdateCategory({
  id,
  name,
}: {
  id: string,
  name: string,
}): Iterable<any> {
  const response = yield call(callUpdateCategory, name, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(
    alertActions.addAlert('Category updated', alertConstants.ALERT_TYPE_INFO)
  );
}

function callDeleteCategory(id: string) {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Removing category failed');
}

export function* onDeleteCategory({ id }: { id: string }): Iterable<any> {
  const response = yield call(callDeleteCategory, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  window.location.href = '/admin/categories';
}

export function callFetchCategories() {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'GET',
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Fetch categories failed');
}

export function* onFetchCategories(): Iterable<any> {
  const response = yield call(callFetchCategories);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const categories = response?._embedded?.categories || [];
  yield put(actions.fetchCategoriesSuccess(categories));
}
