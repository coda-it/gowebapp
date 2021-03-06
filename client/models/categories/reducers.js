import * as actionTypes from './actionTypes';
const defaultState = {
    categories: [],
};
export default function reducers(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                categories: action.categories,
            };
        default:
            return state;
    }
}
//# sourceMappingURL=reducers.js.map