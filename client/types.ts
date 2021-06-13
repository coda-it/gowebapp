import * as alertTypes from './models/alerts/types';
import * as postTypes from './models/posts/types';
import * as categoryTypes from './models/categories/types';
import * as userTypes from './models/users/types';
import * as landingTypes from './models/landing/types';

/* eslint-disable import/prefer-default-export */
export type State = {
  posts: postTypes.State;
  alerts: alertTypes.State;
  categories: categoryTypes.State;
  users: userTypes.State;
  application: {
    isLoaded?: boolean;
  };
  landing: landingTypes.State;
};
/* eslint-enable import/prefer-default-export */
