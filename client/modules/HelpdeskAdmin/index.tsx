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
      <div className="gc-panel__content gc-flex gc-flex--wrap tst-posts">
        <ul className="gc-list">
          {tickets.map((ticket, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="gc-list__item" key={`ticket-item-${index}`}>
              #{ticket.shortHash} - {ticket.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(HelpdeskAdmin);
