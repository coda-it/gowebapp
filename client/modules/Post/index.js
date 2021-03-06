import { connect } from 'react-redux';
import * as postActions from 'client/models/posts/actions';
import * as postSelectors from 'client/models/posts/selectors';
import Post from './Post';
const mapStateToProps = (state, props) => {
    const { isAdmin, match } = props;
    const { postId } = match.params;
    const post = postSelectors.getPostById(state, postId);
    return {
        post,
        isAdmin,
    };
};
const mapDispatchToProps = (dispatch) => ({
    loadPosts: () => {
        dispatch(postActions.fetchPosts());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);
//# sourceMappingURL=index.js.map