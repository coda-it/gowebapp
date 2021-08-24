import * as alertTypes from './models/alerts/types';
import * as postTypes from './models/posts/types';
import * as categoryTypes from './models/categories/types';
import * as userTypes from './models/users/types';
import * as platformTypes from './models/platform/types';

/* eslint-disable import/prefer-default-export */
export type State = {
  posts: postTypes.State;
  alerts: alertTypes.State;
  categories: categoryTypes.State;
  users: userTypes.State;
  application: {
    isLoaded?: boolean;
  };
  platform: platformTypes.State;
};
/* eslint-enable import/prefer-default-export */
