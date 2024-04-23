import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'client/models/helpdesk/selectors';
import * as actions from 'client/models/helpdesk/actions';

function HelpdeskAdmin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllTickets());
  }, []);

  const tickets = useSelector(selectors.getTickets);

  const handleRemoveTicket = (ticketId: string) => () => {
    dispatch(actions.deleteTicket(ticketId));
  };

  return (
    <div className="gc-panel">
      <div className="gc-panel__title">Helpdesk admin</div>
      <div className="gc-panel__content gc-flex--wrap tst-helpdesk">
        {tickets.map((ticket, index) => (
          <div
            className="gc-card gc-card--default gc-panel gm-spacing-tl"
            /* eslint-disable-next-line react/no-array-index-key */
            key={`ticket-item-${index}`}
          >
            <div className="gc-panel__title">
              #{ticket.shortHash} - {ticket.title}
            </div>
            <div className="gc-panel__content">{ticket.description}</div>
            <div className="gc-panel__footer">
              <button
                type="button"
                className="gc-btn gc-btn--small gc-btn--danger"
                onClick={handleRemoveTicket(ticket.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(HelpdeskAdmin);
