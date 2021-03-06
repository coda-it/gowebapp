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
  category?: categoryTypes.Category;
  onAdd: (arg0: string, arg1: string | null) => void;
  onUpdate: (arg0: string, arg1: string, arg2: string | null) => void;
  onDelete: (arg0: string) => void;
  loadCategories: () => void;
};
