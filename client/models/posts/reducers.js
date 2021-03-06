import * as actionTypes from './actionTypes';
const defaultState = {
    posts: [],
};
export default function reducers(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_SUCCESS:
            return {
                posts: action.posts,
            };
        default:
            return state;
    }
}
//# sourceMappingURL=reducers.js.map