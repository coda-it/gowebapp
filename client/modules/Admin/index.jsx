// @flow
import { connect } from 'react-redux';
import * as userSelectors from 'client/models/users/selectors';
import * as globalTypes from 'client/types';
import Admin from './Admin';

const mapStateToProps = (state: globalTypes.State) => ({
  user: userSelectors.getUser(state),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
