import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'client/models/helpdesk/selectors';
import * as actions from 'client/models/helpdesk/actions';
import TicketCard from './ticket';

function HelpdeskAdmin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllTickets());
  }, []);

  const tickets = useSelector(selectors.getTickets);

  return (
    <div className="gc-panel">
      <div className="gc-panel__title">Helpdesk admin</div>
      <div className="gc-panel__content gc-flex--wrap tst-helpdesk">
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={`ticket-item-${ticket.id}`} />
        ))}
      </div>
    </div>
  );
}

export default withRouter(HelpdeskAdmin);
