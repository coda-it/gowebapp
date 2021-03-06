import _ from 'lodash';
export const getCategories = (state) => state.categories.categories;
export const getCategoryById = (state, id) => _.find(state.categories.categories, { id });
//# sourceMappingURL=selectors.js.map