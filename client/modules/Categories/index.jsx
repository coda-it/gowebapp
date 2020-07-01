// @flow
import { connect } from 'react-redux';
import * as categoryActions from 'client/models/categories/actions';
import * as categorySelectors from 'client/models/categories/selectors';
import * as globalTypes from 'client/types';
import Categories from './Categories';
import * as types from './types';

const mapStateToProps = (state: globalTypes.State, props: types.OwnProps) => {
  const { isAdmin } = props;

  return {
    categories: categorySelectors.getCategories(state),
    isAdmin,
  };
};

const mapDispatchToProps = dispatch => ({
  loadCategories: () => {
    dispatch(categoryActions.fetchCategories());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
