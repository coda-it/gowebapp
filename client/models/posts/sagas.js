// @flow
import { put, call, select } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as userSelectors from 'client/models/users/selectors';
import * as actions from './actions';
import * as constants from './constants';

function callAddPost(title: string, description: string, userId: string) {
  const request = new Request(constants.POST_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      userId,
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
  const userId = yield select(userSelectors.getId);
  const response = yield call(callAddPost, title, description, userId);

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }
}

export function callFetchPosts() {
  const request = new Request(constants.POST_ENDPOINT, {
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
