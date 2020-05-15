// @flow
import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as actions from './actions';

function callAddPost(title: string, description: string) {
  const request = new Request('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Adding post failed');
}

export function* onAddPost({
  title,
  description,
}: {
  title: string,
  description: string,
}): Iterable<any> {
  const response = yield call(callAddPost, title, description);

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }
}

export function callFetchPosts() {
  const request = new Request('/api/posts', {
    method: 'GET',
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Fetch posts failed');
}

export function* onFetchPosts(): Iterable<any> {
  const response = yield call(callFetchPosts);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const posts = response?._embedded?.posts || [];
  yield put(actions.fetchPostsSuccess(posts));
}
