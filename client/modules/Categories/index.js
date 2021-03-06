import { connect } from 'react-redux';
import * as categoryActions from 'client/models/categories/actions';
import * as categorySelectors from 'client/models/categories/selectors';
import Categories from './Categories';
const mapStateToProps = (state, props) => {
    const { isAdmin } = props;
    return {
        categories: categorySelectors.getCategories(state),
        isAdmin,
    };
};
const mapDispatchToProps = (dispatch) => ({
    loadCategories: () => {
        dispatch(categoryActions.fetchCategories());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
//# sourceMappingURL=index.js.map