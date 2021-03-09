import * as categoryTypes from 'client/models/categories/types';

export type OwnProps = {
  isAdmin?: boolean;
};

export type Props = {
  loadCategories: () => void;
  categories: ReadonlyArray<categoryTypes.Category>;
  isAdmin?: boolean;
};
