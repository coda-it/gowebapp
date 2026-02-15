import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Card,
  Button,
  Panel,
  PanelTitle,
  PanelContent,
  Flex,
  FlexItem,
  PanelFooter,
} from 'graphen';
import * as utils from 'client/utils/translations';
import type * as types from './types';

function Helpdesk(props: types.Props) {
  const { createTicket, fetchTicket, id, ticket } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      fetchTicket(id);
    }
  }, [id]);

  const handleTitleChange = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const handleDescriptionChange = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setTitle]
  );

  return (
    <Card isGradient className="l-helpdesk">
      <Panel>
        <PanelTitle>Helpdesk</PanelTitle>
        <PanelContent>
          <Flex wrap="wrap" isVertical>
            <FlexItem>
              <div className="gc-input gc-input--full">
                {/* eslint-disable jsx-a11y/label-has-associated-control */}
                <label htmlFor="ticket-title" className="gc-input__label">
                  {utils.getLocalization('Helpdesk_Title') ?? 'Title'}
                </label>
                {/* eslint-enable jsx-a11y/label-has-associated-control */}
                {ticket ? (
                  <p>{ticket.title}</p>
                ) : (
                  <input
                    id="ticket-title"
                    value={title}
                    onChange={handleTitleChange}
                    className="gc-input__field tst-ticket-title"
                  />
                )}
              </div>
            </FlexItem>
            <FlexItem>
              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <label htmlFor="post-description" className="gc-input__label">
                {utils.getLocalization('Helpdesk_Description') ?? 'Description'}
              </label>
              {/* eslint-enable jsx-a11y/label-has-associated-control */}
              {ticket ? (
                <p>{ticket.description}</p>
              ) : (
                <textarea
                  id="ticket-description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="gc-textarea"
                />
              )}
            </FlexItem>
          </Flex>
        </PanelContent>
        <PanelFooter>
          {!id && (
            <Button
              className="gc-btn--primary"
              isFull
              onClick={() => {
                createTicket(title, description);
              }}
            >
              {utils.getLocalization('AddButton') ?? 'Add'}
            </Button>
          )}
        </PanelFooter>
      </Panel>
    </Card>
  );
}

export default withRouter(Helpdesk);
