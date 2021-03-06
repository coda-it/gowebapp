// @ts-ignore
import { connect } from 'react-redux';
// @ts-ignore
import * as postActions from 'client/models/posts/actions';
// @ts-ignore
import * as postSelectors from 'client/models/posts/selectors';
// @ts-ignore
import * as categorySelectors from 'client/models/categories/selectors';
// @ts-ignore
import * as userSelectors from 'client/models/users/selectors';
// @ts-ignore
import * as userTypes from 'client/models/users/types';
// @ts-ignore
import * as globalTypes from 'client/types';
// @ts-ignore
import * as categoryActions from 'client/models/categories/actions';
import Posts from './Posts';
import type * as types from './types';

const mapStateToProps = (state: globalTypes.State, props: types.OwnProps) => {
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
  loadPosts: (user?: userTypes.User) => {
    dispatch(postActions.fetchPosts(user));
  },
  loadCategories: () => {
    dispatch(categoryActions.fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
