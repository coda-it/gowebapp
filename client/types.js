// @flow
import * as alertTypes from './models/alerts/types';
import * as postTypes from './models/posts/types';
import * as userTypes from './models/users/types';

/* eslint-disable import/prefer-default-export */
export type State = {
  posts: postTypes.State,
  alerts: alertTypes.State,
  users: userTypes.State,
};
/* eslint-enable import/prefer-default-export */
