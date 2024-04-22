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

  return (
    <div className="gc-panel">
      <div className="gc-panel__title">Helppdesk admin</div>
      <div className="gc-panel__content gc-flex--wrap tst-posts">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(HelpdeskAdmin);
