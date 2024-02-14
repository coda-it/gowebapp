import { combineReducers } from '@reduxjs/toolkit';
import application from 'client/modules/Application/reducers';
import alerts from 'client/models/alerts/reducers';
import posts from 'client/models/posts/reducers';
import categories from 'client/models/categories/reducers';
import users from 'client/models/users/reducers';
import platform from 'client/models/platform/reducers';
import helpdesk from 'client/models/helpdesk/reducers';

export default combineReducers({
  application,
  alerts,
  posts,
  users,
  categories,
  platform,
  helpdesk,
});
