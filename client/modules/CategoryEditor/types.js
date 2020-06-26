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
  onAdd: (string, string | null) => void,
  onUpdate: (string, string, string | null) => void,
  onDelete: string => void,
  loadCategories: () => void,
|};
