import { connect } from 'react-redux';
import * as postSelectors from 'client/models/posts/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as postActions from 'client/models/posts/actions';
import * as categoryActions from 'client/models/categories/actions';
import * as categorySelectors from 'client/models/categories/selectors';
import PostEditor from './PostEditor';
const mapStateToProps = (state, ownProps) => {
    const { match: { params }, } = ownProps;
    const { id } = params;
    const post = id ? postSelectors.getPostById(state, id) : undefined;
    const categories = categorySelectors.getCategories(state);
    const user = userSelectors.getUser(state);
    return {
        post,
        user,
        categories,
    };
};
const mapDispatchToProps = (dispatch) => ({
    onAdd: (title, description, categoryId, image) => dispatch(postActions.addPost(title, description, categoryId, image)),
    onUpdate: (id, title, description, categoryId, image) => dispatch(postActions.updatePost(id, title, description, categoryId, image)),
    onDelete: (id) => dispatch(postActions.deletePost(id)),
    loadPosts: (user) => {
        dispatch(postActions.fetchPosts(user));
    },
    loadCategories: () => {
        dispatch(categoryActions.fetchCategories());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
//# sourceMappingURL=index.js.map