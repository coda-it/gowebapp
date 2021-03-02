// @flow
import { connect } from 'react-redux';
import * as postActions from 'client/models/posts/actions';
import * as postSelectors from 'client/models/posts/selectors';
import * as globalTypes from 'client/types';
import Post from './Post';
import * as types from './types';

const mapStateToProps = (state: globalTypes.State, props: types.OwnProps) => {
  const { isAdmin, match } = props;
  const { postId } = match.params;
  const post = postSelectors.getPostById(state, postId);

  return {
    post,
    isAdmin,
  };
};

const mapDispatchToProps = dispatch => ({
  loadPosts: () => {
    dispatch(postActions.fetchPosts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
