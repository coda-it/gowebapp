// @flow
export type Post = {
  id: string,
  title: string,
  description: string,
};

export type State = {
  posts: $ReadOnlyArray<Post>,
};
