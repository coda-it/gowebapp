// @flow
import { connect } from 'react-redux';
import * as globalTypes from 'client/types';
import * as postSelectors from 'client/models/posts/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as userTypes from 'client/models/users/types';
import * as postActions from 'client/models/posts/actions';
import * as categoryActions from 'client/models/categories/actions';
import * as types from './types';
import PostEditor from './PostEditor';
import * as categorySelectors from '../../models/categories/selectors';

const mapStateToProps = (
  state: globalTypes.State,
  ownProps: types.OwnProps
) => {
  const {
    match: { params },
  } = ownProps;
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

const mapDispatchToProps = dispatch => ({
  onAdd: (title, description, categoryId, image) =>
    dispatch(postActions.addPost(title, description, categoryId, image)),
  onUpdate: (id, title, description, categoryId, image) =>
    dispatch(postActions.updatePost(id, title, description, categoryId, image)),
  onDelete: id => dispatch(postActions.deletePost(id)),
  loadPosts: (user?: userTypes.User) => {
    dispatch(postActions.fetchPosts(user));
  },
  loadCategories: () => {
    dispatch(categoryActions.fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
