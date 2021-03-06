import * as userTypes from 'client/models/users/types';
import * as postTypes from 'client/models/posts/types';
import * as categoryTypes from 'client/models/categories/types';

export type OwnProps = {
  isAdmin?: boolean;
  match?: {
    params?: {
      categoryId?: string;
    };
  };
};

export type Props = {
  loadPosts: (user?: userTypes.User) => void;
  loadCategories: () => void;
  posts: ReadonlyArray<postTypes.Post>;
  user?: userTypes.User;
  category?: categoryTypes.Category;
  isAdmin?: boolean;
};
