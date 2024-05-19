import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dropdown,
  Accordion,
  Dialog,
  Button,
  Panel,
  PanelFooter,
  PanelContent,
  PanelTitle,
  Flex,
  Card,
} from 'graphen';
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
    <Panel className="gm-spacing-tl">
      <Card>
        <Accordion title={`#${ticket.shortHash} - ${ticket.title}`}>
          <>
            <PanelContent>{ticket.description}</PanelContent>
            <PanelFooter>
              <Flex>
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
              </Flex>
            </PanelFooter>
          </>
        </Accordion>
      </Card>
      {ticketRemove && (
        <Dialog>
          <Panel>
            <PanelTitle>Delete ticket</PanelTitle>
            <PanelContent>
              <p>
                Are you sure you want to delete ticket #{ticketRemove.shortHash}
                ?
              </p>
            </PanelContent>
            <PanelFooter>
              <Flex>
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
              </Flex>
            </PanelFooter>
          </Panel>
        </Dialog>
      )}
    </Panel>
  );
}

export default TicketCard;
