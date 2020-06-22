// @flow
import * as categoryTypes from 'client/models/categories/types';

export type OwnProps = {|
  isAdmin?: boolean,
|};

export type Props = {|
  loadCategories: () => void,
  categories: $ReadOnlyArray<categoryTypes.Category>,
  isAdmin?: boolean,
|};
