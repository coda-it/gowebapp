import { put, take } from 'redux-saga/effects';
import * as userActions from 'client/models/users/actions';
import * as userActionTypes from 'client/models/users/actionTypes';
import * as actions from './actions';
export function* onApplicationMount() {
    yield put(userActions.fetchUser());
    yield take([userActionTypes.LOAD_USER]);
    yield put(actions.loaded());
}
//# sourceMappingURL=sagas.js.map