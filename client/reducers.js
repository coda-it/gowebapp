// @flow
import { combineReducers } from 'redux';
import application from 'client/modules/Application/reducers';
import alerts from 'client/models/alerts/reducers';
import posts from 'client/models/posts/reducers';

export default combineReducers({
  application,
  alerts,
  posts,
});
