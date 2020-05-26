// @flow
import { connect } from 'react-redux';
import * as postActions from 'client/models/posts/actions';
import * as postSelectors from 'client/models/posts/selectors';
import * as userTypes from 'client/models/users/types';
import * as globalTypes from 'client/types';
import Posts from './Posts';

const mapStateToProps = (state: globalTypes.State) => ({
  posts: postSelectors.getPosts(state),
});

const mapDispatchToProps = dispatch => ({
  loadPosts: (user?: userTypes.User) => {
    dispatch(postActions.fetchPosts(user));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
