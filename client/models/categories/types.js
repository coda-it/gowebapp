// @flow
export type Category = {
  id: string,
  title: string,
};

export type State = {
  categories: $ReadOnlyArray<Category>,
};
