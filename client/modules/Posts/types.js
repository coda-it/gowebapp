// @flow
import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';

/* eslint-disable import/prefer-default-export */
export type Props = {|
  loadPosts: (?userTypes.User) => void,
  posts: $ReadOnlyArray<postTypes.Post>,
  user?: userTypes.User,
  isAdmin?: boolean,
|};
/* eslint-enable import/prefer-default-export */
