import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button,
  Dialog,
  Panel,
  PanelTitle,
  PanelContent,
  Flex,
  FlexItem,
  Card,
  PanelFooter,
  Separator,
} from 'graphen';
import * as userActions from 'client/models/users/actions';
import * as utils from 'client/utils/translations';

function Account() {
  const dispatch = useDispatch();

  const [isDialogShown, setIsDialogShown] = useState(false);

  const handleDeleteAccountClick = useCallback(() => {
    setIsDialogShown(true);
  }, []);

  const handleCancelClick = useCallback(() => {
    setIsDialogShown(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    dispatch(userActions.deleteUser());
  }, [dispatch]);

  return (
    <Panel className="gm-spacing-bl">
      <PanelTitle>
        {utils.getLocalization('Account_Header') ?? 'Account'}
      </PanelTitle>
      <PanelContent>
        <Flex isVertical>
          <FlexItem>
            <Card isGradient>
              <Panel>
                <PanelTitle>
                  {utils.getLocalization('Account_RemoveAccountHeader') ??
                    'Delete account'}
                </PanelTitle>
                <PanelContent>
                  {utils.getLocalization('Account_RemoveAccountDescription') ??
                    'In order to delete your account, press the below button and\n' +
                      '                  confirm the action.'}
                </PanelContent>
                <PanelFooter>
                  <Separator />
                  <Button
                    className="gc-btn--danger"
                    onClick={handleDeleteAccountClick}
                  >
                    {utils.getLocalization('Account_RemoveAccountButton') ??
                      'Delete account'}
                  </Button>
                </PanelFooter>
              </Panel>
            </Card>
          </FlexItem>
        </Flex>
      </PanelContent>

      {isDialogShown && (
        <Dialog>
          <article className="gc-panel">
            <header className="gc-panel__title">
              {utils.getLocalization('Account_RemoveAccountHeader') ??
                'Delete account'}
            </header>
            <div className="gc-panel__content">
              <p>
                {utils.getLocalization(
                  'Account_RemoveAccountDialogDescription'
                ) ?? 'Are you sure you want to delete your account?'}
              </p>
            </div>
            <div className="gc-panel__footer">
              <div className="gc-flex">
                <div className="gm-spacing-rl">
                  <Button
                    onClick={handleCancelClick}
                    className="gc-btn--secondary"
                  >
                    {utils.getLocalization('CancelButton') ?? 'Cancel'}
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleConfirmDelete}
                    className="gc-btn--danger"
                  >
                    {utils.getLocalization('DeleteButton') ?? 'Delete'}
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </Dialog>
      )}
    </Panel>
  );
}

export default withRouter(Account);
