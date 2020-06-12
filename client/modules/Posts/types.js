// @flow
import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';

export type OwnProps = {|
  isAdmin?: boolean,
|};

export type Props = {|
  loadPosts: (?userTypes.User) => void,
  posts: $ReadOnlyArray<postTypes.Post>,
  user?: userTypes.User,
  isAdmin?: boolean,
|};
