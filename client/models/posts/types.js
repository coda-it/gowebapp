// @flow
export type Post = {
  id: string,
  title: string,
  description: string,
  categoryId: string | null,
  userId?: string,
  image: string | null,
};

export type State = {
  posts: $ReadOnlyArray<Post>,
};
