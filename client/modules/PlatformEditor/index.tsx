import { connect } from 'react-redux';
import * as platformActions from 'client/models/platform/actions';
import * as platformSelectors from 'client/models/platform/selectors';
import * as globalTypes from 'client/types';
import PlatformEditor from './PlatformEditor';

const mapStateToProps = (state: globalTypes.State) => {
  const config = platformSelectors.getPlatformConfig(state);
  return {
    config,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(platformActions.fetchPlatform()),
  onUpdate: (config) => dispatch(platformActions.updatePlatform(config)),
  onAdd: (config) => dispatch(platformActions.addPlatform(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlatformEditor);
