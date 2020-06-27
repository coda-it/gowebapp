// @flow
export type Category = {
  id: string,
  name: string,
  image: string | null,
};

export type State = {
  categories: $ReadOnlyArray<Category>,
};
