// @flow
import * as categoryTypes from 'client/models/categories/types';

export type OwnProps = {||};

export type Props = {|
  loadCategories: () => void,
  categories: $ReadOnlyArray<categoryTypes.Category>,
|};
