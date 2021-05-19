import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import * as landingActions from 'client/models/landing/actions';
import * as landingSelectors from 'client/models/landing/selectors';
import * as globalTypes from 'client/types';
import * as types from './types';

const mapStateToProps = (state) => {
	return {
	input: state.input,
        id: state.id
    }
};

const mapDispatchToProps = (dispatch) => ({
	setInput: () => dispatch(landingActions.putLanding())
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
