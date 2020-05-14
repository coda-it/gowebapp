// @flow
import { takeEvery } from 'redux-saga/effects';
import * as applicationSagas from './modules/Application/sagas';
import * as applicationActionTypes from './modules/Application/actionTypes';
import * as postsSagas from './models/posts/sagas';
import * as postsActionTypes from './models/posts/actionTypes';

function* root(): Iterable<any> {
  yield [
    takeEvery(
      applicationActionTypes.MOUNT,
      applicationSagas.onApplicationMount
    ),
    takeEvery(postsActionTypes.ADD_POST, postsSagas.onAddPost),
    takeEvery(postsActionTypes.FETCH_POSTS, postsSagas.onFetchPosts),
  ];
}

export default root;
