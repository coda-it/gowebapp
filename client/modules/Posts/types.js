// @flow
import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';

export type OwnProps = {|
  isAdmin?: boolean,
  match?: {|
    params?: {|
      categoryId?: string,
    |},
  |},
|};

export type Props = {|
  loadPosts: (?userTypes.User) => void,
  posts: $ReadOnlyArray<postTypes.Post>,
  user?: userTypes.User,
  isAdmin?: boolean,
|};
