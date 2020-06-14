// @flow
import { connect } from 'react-redux';
import * as globalTypes from 'client/types';
import * as postSelectors from 'client/models/posts/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as userTypes from 'client/models/users/types';
import * as postActions from 'client/models/posts/actions';
import * as types from './types';
import PostEditor from './PostEditor';

const mapStateToProps = (
  state: globalTypes.State,
  ownProps: types.OwnProps
) => {
  const {
    match: { params },
  } = ownProps;
  const { id } = params;
  const post = id ? postSelectors.getPostById(state, id) : undefined;
  const user = userSelectors.getUser(state);

  return {
    post,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: (title, description) =>
    dispatch(postActions.addPost(title, description)),
  onUpdate: (id, title, description) =>
    dispatch(postActions.updatePost(id, title, description)),
  onDelete: id => dispatch(postActions.deletePost(id)),
  loadPosts: (user?: userTypes.User) => {
    dispatch(postActions.fetchPosts(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
