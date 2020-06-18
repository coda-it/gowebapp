// @flow
export type Category = {
  id: string,
  name: string,
};

export type State = {
  categories: $ReadOnlyArray<Category>,
};
