// @flow
import { put, call } from 'redux-saga/effects';
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
    .catch(() => 'Send alert failed');
}

export function* onAddPost({
  title,
  description,
}: {
  title: string,
  description: string,
}): Iterable<any> {
  yield call(callAddPost, title, description);
}

export function callFetchPosts() {
  const request = new Request('/api/posts', {
    method: 'GET',
  });

  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Fetching data error: ${response.statusText}`);
      }

      return response.json();
    })
    .catch(e => e);
}

export function* onFetchPosts(): Iterable<any> {
  const data = yield call(callFetchPosts);
  const posts = data?._embedded?.posts || [];
  yield put(actions.fetchPostsSuccess(posts));
}
