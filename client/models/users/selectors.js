export const getUser = (state) => {
    return state.users?.user;
};
export const getId = (state) => {
    return getUser(state).id || '';
};
export const getUsername = (state) => {
    return getUser(state).username || '';
};
export const getPassword = (state) => {
    return getUser(state).password || '';
};
export const getFeatureFlags = (state) => {
    return getUser(state).featureFlags || {};
};
//# sourceMappingURL=selectors.js.map