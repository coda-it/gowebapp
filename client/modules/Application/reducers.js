import * as actionTypes from './actionTypes';
const defaultState = {
    isLoaded: false,
};
export default function reducers(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.LOADED:
            return { ...state, isLoaded: true };
        default:
            return state;
    }
}
//# sourceMappingURL=reducers.js.map