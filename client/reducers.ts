// @ts-ignore
import { combineReducers } from 'redux';
// @ts-ignore
import application from 'client/modules/Application/reducers';
// @ts-ignore
import alerts from 'client/models/alerts/reducers';
// @ts-ignore
import posts from 'client/models/posts/reducers';
// @ts-ignore
import categories from 'client/models/categories/reducers';
// @ts-ignore
import users from 'client/models/users/reducers';

export default combineReducers({
  application,
  alerts,
  posts,
  users,
  categories,
});
