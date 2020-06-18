// @flow
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
  onAdd: string => void,
  onUpdate: (string, string) => void,
  onDelete: string => void,
  loadCategories: () => void,
|};
