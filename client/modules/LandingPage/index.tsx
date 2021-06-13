import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import * as landingActions from 'client/models/landing/actions';
import * as landingSelectors from 'client/models/landing/selectors';
import * as globalTypes from 'client/types';
import * as types from './types';

const mapStateToProps = (state: globalTypes.State) => {
	const landing = landingSelectors.getLanding(state)
	return {
	landingModule: landing.landingModule,
        id: landing.id
    }
};

const mapDispatchToProps = (dispatch) => ({
	loadLanding: () => dispatch(landingActions.fetchLanding()),
	onUpdate: (input, id) => dispatch(landingActions.updateLanding(input, id)),
	onAdd: (input) => dispatch(landingActions.addLanding(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
