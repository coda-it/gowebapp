import { connect } from 'react-redux';
import * as helpdeskActions from 'client/models/helpdesk/actions';
import * as globalTypes from 'client/types';
import * as ticketModelSelectors from 'client/models/helpdesk/selectors';
import Helpdesk from './Helpdesk';
import * as types from './types';

const mapStateToProps = (state: globalTypes.State, props: types.OwnProps) => {
  const {
    isAdmin,
    match: { params },
  } = props;
  const { id } = params;

  const ticket = ticketModelSelectors.getTicket(state);

  return {
    isAdmin,
    id,
    ticket,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createTicket: (title: string, description: string) => {
    dispatch(helpdeskActions.createTicket(title, description));
  },
  fetchTicket: (id: string) => {
    dispatch(helpdeskActions.fetchTicket(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Helpdesk);
