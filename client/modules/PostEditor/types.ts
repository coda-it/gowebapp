import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';
import * as categoryTypes from 'client/models/categories/types';

export type OwnProps = {
  id?: string;
  match: {
    params: {
      id?: string;
    };
  };
};

export type Props = {
  post?: postTypes.Post;
  categories: ReadonlyArray<categoryTypes.Category>;
  user?: userTypes.User;
  onAdd: (
    arg0: string,
    arg1: string,
    arg2: string | null,
    arg3: string | null
  ) => void;
  onUpdate: (
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: string | null,
    arg4: string | null
  ) => void;
  onDelete: (arg0: string) => void;
  loadPosts: (user?: userTypes.User) => void;
  loadCategories: () => void;
};
