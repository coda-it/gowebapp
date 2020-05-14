// @flow
import { connect } from 'react-redux';
import * as postsActions from 'client/models/posts/actions';
import NewPost from './NewPost';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onAdd: (title, description) =>
    dispatch(postsActions.addPost(title, description)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
