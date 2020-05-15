// @flow
import { connect } from 'react-redux';
import * as postActions from 'client/models/posts/actions';
import * as postSelectors from 'client/models/posts/selectors';
import * as globalTypes from 'client/types';
import Posts from './Posts';

const mapStateToProps = (state: globalTypes.State) => ({
  posts: postSelectors.getPosts(state),
});

const mapDispatchToProps = dispatch => ({
  loadPosts: () => {
    dispatch(postActions.fetchPosts());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
