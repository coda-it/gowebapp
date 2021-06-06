import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import * as landingActions from 'client/models/landing/actions';
import * as landingSelectors from 'client/models/landing/selectors';
import * as globalTypes from 'client/types';
import * as types from './types';

const mapStateToProps = (state) => {
	console.log('state', state.landing)
	return {
	landingModule: state.landing.landingModule,
        id: state.landing.id
    }
};

const mapDispatchToProps = (dispatch) => ({
	loadLanding: () => dispatch(landingActions.fetchLanding()),
	onUpdate: (input) => dispatch(landingActions.updateLanding(input)),
	onAdd: (input) => dispatch(landingActions.addLanding(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
