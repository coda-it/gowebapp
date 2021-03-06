import _ from 'lodash';
export const getPosts = (state) => state.posts.posts;
export const getPostById = (state, id) => _.find(getPosts(state), { id });
export const getPostsByCategoryId = (state, categoryId) => _.filter(getPosts(state), { categoryId });
//# sourceMappingURL=selectors.js.map