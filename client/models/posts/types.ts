import type * as userTypes from 'client/models/users/types';

export type Post = {
  id: string;
  title: string;
  description: string;
  categoryId: string | null;
  userId?: string;
  image: string | null;
};

export type State = {
  posts: ReadonlyArray<Post>;
};

export type Action = {
  type: string;
  posts: ReadonlyArray<Post>;
};

export type AddPostAction = {
  type: string;
  title: string;
  description: string;
  categoryId: string | null;
  image: string | null;
};

export type DeletePostAction = {
  type: string;
  id: string;
};

export type FetchPostsAction = {
  type: string;
  user: userTypes.User;
};

export type UpdatePostAction = Post & {
  type: string;
};

type ApiResponseEmbedded = {
  posts: ReadonlyArray<Post>;
};

export type ApiResponse =
  | {
      _embedded: ApiResponseEmbedded;
    }
  | string
  | undefined;
