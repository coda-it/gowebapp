export type Category = {
  id: string,
  name: string,
  image: string | null,
};

export type State = {
  categories: ReadonlyArray<Category>,
};

export type Action = {
  type: string,
  categories: ReadonlyArray<Category>,
};

export type UpdateCategoryAction = Category & {
  type: string,
};

export type AddCategoryAction = {
  type: string,
  name: string,
  image: string | null,
};

export type DeleteCategoryAction = {
  type: string,
  id: string,
};


type ApiResponseEmbedded = {
  categories: ReadonlyArray<Category>
}

export type ApiResponse = {
  _embedded: ApiResponseEmbedded,
} | string | undefined;
