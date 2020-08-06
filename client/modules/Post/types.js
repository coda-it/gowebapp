// @flow
import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';

export type OwnProps = {|
  isAdmin?: boolean,
  match: {|
    params: {|
      postId: string,
    |},
  |},
|};

export type Props = {|
  loadPosts: (?userTypes.User) => void,
  post: postTypes.Post,
|};
