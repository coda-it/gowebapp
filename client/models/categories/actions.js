import * as actionTypes from './actionTypes';
export const addCategory = (name, image) => ({
    type: actionTypes.ADD_CATEGORY,
    name,
    image,
});
export const updateCategory = (id, name, image) => ({
    type: actionTypes.UPDATE_CATEGORY,
    id,
    name,
    image,
});
export const deleteCategory = (id) => ({
    type: actionTypes.DELETE_CATEGORY,
    id,
});
export const fetchCategories = () => ({
    type: actionTypes.FETCH_CATEGORIES,
});
export const fetchCategoriesSuccess = (categories) => ({
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories,
});
//# sourceMappingURL=actions.js.map