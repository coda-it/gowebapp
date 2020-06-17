// @flow
import * as userTypes from 'client/models/users/types';
import * as categoryTypes from 'client/models/categories/types';

export type OwnProps = {|
  id?: string,
  match: {|
    params: {|
      id?: string,
    |},
  |},
|};

export type Props = {|
  category?: categoryTypes.Category,
  onAdd: (string, string) => void,
  onUpdate: (string, string, string) => void,
  onDelete: string => void,
  loadPosts: (?userTypes.User) => void,
|};
