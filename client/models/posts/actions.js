import * as actionTypes from './actionTypes';
export const addPost = (title, description, categoryId, image) => ({
    type: actionTypes.ADD_POST,
    title,
    description,
    categoryId,
    image,
});
export const updatePost = (id, title, description, categoryId, image) => ({
    type: actionTypes.UPDATE_POST,
    id,
    title,
    description,
    categoryId,
    image,
});
export const deletePost = (id) => ({
    type: actionTypes.DELETE_POST,
    id,
});
export const fetchPosts = (user) => ({
    type: actionTypes.FETCH_POSTS,
    user,
});
export const fetchPostsSuccess = (posts) => ({
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts,
});
//# sourceMappingURL=actions.js.map