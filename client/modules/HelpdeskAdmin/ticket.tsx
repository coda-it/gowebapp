import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Accordion, Dialog, Button } from 'graphen';
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
  const [ticketRemove, setTicketRemove] = useState<types.Ticket | undefined>(
    undefined
  );

  const handleRemoveTicket = () => {
    setTicketRemove(ticket);
  };
  const handleConfirmRemoveTicket = useCallback(() => {
    dispatch(actions.deleteTicket(ticketRemove.id));
  }, [dispatch, ticketRemove]);
  const handleCancelRemoveTicket = () => {
    setTicketRemove(undefined);
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
      <Accordion title={`#${ticket.shortHash} - ${ticket.title}`}>
        <>
          <div className="gc-panel__content">{ticket.description}</div>
          <div className="gc-panel__footer">
            <div className="gc-flex">
              <div className="gm-spacing-rl">
                <button
                  type="button"
                  className="gc-btn gc-btn--primary"
                  onClick={handleUpdateTicket}
                >
                  Update
                </button>
              </div>
              <div className="gm-spacing-rl">
                <button
                  type="button"
                  className="gc-btn gc-btn--danger"
                  onClick={handleRemoveTicket}
                >
                  Remove
                </button>
              </div>
              <div>
                <Dropdown
                  initValue={{
                    label: ticket.status,
                    value: ticket.status,
                  }}
                  items={constants.TICKET_STATUSES.map((status) => ({
                    label: status,
                    value: status,
                  }))}
                  onChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
        </>
      </Accordion>
      {ticketRemove && (
        <Dialog>
          <article className="gc-panel">
            <header className="gc-panel__title">Delete ticket</header>
            <div className="gc-panel__content">
              <p>
                Are you sure you want to delete ticket #{ticketRemove.shortHash}
                ?
              </p>
            </div>
            <div className="gc-panel__footer">
              <div className="gc-flex">
                <div className="gm-spacing-rl">
                  <Button
                    onClick={handleCancelRemoveTicket}
                    className="gc-btn--secondary"
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleConfirmRemoveTicket}
                    className="gc-btn--danger"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </Dialog>
      )}
    </div>
  );
}

export default TicketCard;
