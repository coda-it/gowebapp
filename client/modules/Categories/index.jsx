// @flow
import { connect } from 'react-redux';
import * as categoryActions from 'client/models/categories/actions';
import * as categorySelectors from 'client/models/categories/selectors';
import * as globalTypes from 'client/types';
import Categories from './Categories';

const mapStateToProps = (state: globalTypes.State) => {
  return {
    categories: categorySelectors.getCategories(state),
  };
};

const mapDispatchToProps = dispatch => ({
  loadCategories: () => {
    dispatch(categoryActions.fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
