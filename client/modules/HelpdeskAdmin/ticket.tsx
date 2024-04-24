import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'graphen';
import * as actions from 'client/models/helpdesk/actions';
import * as constants from 'client/models/helpdesk/constants';
import type * as types from 'client/models/helpdesk/types';

type Props = {
  ticket: types.Ticket;
};

function TicketCard({ ticket }: Props) {
  const dispatch = useDispatch();
  const [ticketStatus, setTicketStatus] = useState<types.TicketStatus>(
    ticket.status ?? constants.TICKET_STATUS_INPROGRESS
  );

  const handleRemoveTicket = () => {
    dispatch(actions.deleteTicket(ticket.id));
  };
  const handleUpdateTicket = () => {
    dispatch(
      actions.updateTicket({
        ...ticket,
        status: ticketStatus,
      })
    );
  };
  const handleStatusChange = (status: types.TicketStatus) => {
    setTicketStatus(status);
  };

  return (
    <div className="gc-card gc-card--default gc-panel gm-spacing-tl">
      <div className="gc-panel__title">
        #{ticket.shortHash} - {ticket.title}
      </div>
      <div className="gc-panel__content">
        <div className="gm-spacing-bl">
          <Dropdown
            initValue={{
              label: ticket.status,
              value: ticket.status,
            }}
            label="Status"
            items={constants.TICKET_STATUSES.map((status) => ({
              label: status,
              value: status,
            }))}
            onChange={handleStatusChange}
          />
        </div>
        <div>{ticket.description}</div>
      </div>
      <div className="gc-panel__footer">
        <button
          type="button"
          className="gc-btn gc-btn--small gc-btn--primary gm-spacing-rl"
          onClick={handleUpdateTicket}
        >
          Update
        </button>
        <button
          type="button"
          className="gc-btn gc-btn--small gc-btn--danger"
          onClick={handleRemoveTicket}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default TicketCard;
