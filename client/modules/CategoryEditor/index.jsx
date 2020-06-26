// @flow
import { connect } from 'react-redux';
import * as globalTypes from 'client/types';
import * as categorySelectors from 'client/models/categories/selectors';
import * as categoryActions from 'client/models/categories/actions';
import * as types from './types';
import CategoryEditor from './CategoryEditor';

const mapStateToProps = (
  state: globalTypes.State,
  ownProps: types.OwnProps
) => {
  const {
    match: { params },
  } = ownProps;
  const { id } = params;
  const category = id
    ? categorySelectors.getCategoryById(state, id)
    : undefined;

  return {
    category,
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: (name, image) => dispatch(categoryActions.addCategory(name, image)),
  onUpdate: (id, name, image) =>
    dispatch(categoryActions.updateCategory(id, name, image)),
  onDelete: id => dispatch(categoryActions.deleteCategory(id)),
  loadCategories: () => {
    dispatch(categoryActions.fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditor);
