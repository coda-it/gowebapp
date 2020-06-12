// @flow
import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';

export type OwnProps = {|
  id?: string,
  match: {|
    params: {|
      id?: string,
    |},
  |},
|};

export type Props = {|
  post?: postTypes.Post,
  user?: userTypes.User,
  onAdd: (string, string) => void,
  onUpdate: (string, string, string) => void,
  loadPosts: (?userTypes.User) => void,
|};
