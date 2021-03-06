import { connect } from 'react-redux';
import * as postActions from 'client/models/posts/actions';
import * as postSelectors from 'client/models/posts/selectors';
import * as categorySelectors from 'client/models/categories/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as categoryActions from 'client/models/categories/actions';
import Posts from './Posts';
const mapStateToProps = (state, props) => {
    const { isAdmin, match } = props;
    const categoryId = match?.params?.categoryId;
    const posts = categoryId
        ? postSelectors.getPostsByCategoryId(state, categoryId)
        : postSelectors.getPosts(state);
    const category = categorySelectors.getCategoryById(state, categoryId);
    return {
        posts,
        user: isAdmin ? userSelectors.getUser(state) : undefined,
        isAdmin,
        category,
    };
};
const mapDispatchToProps = (dispatch) => ({
    loadPosts: (user) => {
        dispatch(postActions.fetchPosts(user));
    },
    loadCategories: () => {
        dispatch(categoryActions.fetchCategories());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
//# sourceMappingURL=index.js.map