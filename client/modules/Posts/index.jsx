// @flow
import { connect } from 'react-redux';
import * as postActions from 'client/models/posts/actions';
import * as postSelectors from 'client/models/posts/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as userTypes from 'client/models/users/types';
import * as globalTypes from 'client/types';
import Posts from './Posts';
import * as types from './types';

const mapStateToProps = (state: globalTypes.State, props: types.OwnProps) => {
  const { isAdmin, match } = props;
  const categoryId = match?.params?.categoryId;
  const posts = categoryId
    ? postSelectors.getPostByCategoryId(state, categoryId)
    : postSelectors.getPosts(state);

  return {
    posts,
    user: isAdmin ? userSelectors.getUser(state) : undefined,
    isAdmin,
  };
};

const mapDispatchToProps = dispatch => ({
  loadPosts: (user?: userTypes.User) => {
    dispatch(postActions.fetchPosts(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
