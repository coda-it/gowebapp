// @flow
import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';
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
  post?: postTypes.Post,
  categories: $ReadOnlyArray<categoryTypes.Category>,
  user?: userTypes.User,
  onAdd: (string, string, string | null, string | null) => void,
  onUpdate: (string, string, string, string | null, string | null) => void,
  onDelete: string => void,
  loadPosts: (?userTypes.User) => void,
  loadCategories: () => void,
|};
