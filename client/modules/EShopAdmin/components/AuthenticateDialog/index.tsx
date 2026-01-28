import {
  Button,
  Dialog,
  Flex,
  FlexItem,
  Panel,
  PanelContent,
  PanelFooter,
  PanelTitle,
} from 'graphen';
import * as utils from 'client/utils/translations';
import routes from 'client/constants/routes';
import React, { useCallback, useState } from 'react';
import * as actions from 'client/models/eshop/actions';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import { useDispatch } from 'react-redux';

function AuthenticateDialog({ username }: { username?: string }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  const handlePasswordChange = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const authenticate = useCallback(() => {
    if (username && password) {
      dispatch(actions.getJwtTokenRequest(username, password));
      return;
    }

    dispatch(
      alertActions.addAlert(
        utils.getLocalization('eShop_Admin_AuthenticateMissingData') ??
          'User data or password is not provided',
        alertConstants.ALERT_TYPE_ERROR
      )
    );
  }, [username, password]);

  return (
    <Dialog isOverlay>
      <Panel>
        <PanelTitle>
          {utils.getLocalization('eShop_Admin_Authenticate_Title') ??
            'Authenticate to e-shop'}
        </PanelTitle>
        <PanelContent>
          <Flex isVertical>
            <FlexItem className="gm-spacing-bm">
              {utils.getLocalization('eShop_Admin_AuthenticateContent') ??
                'Authenticate to e-shop with password.'}
            </FlexItem>
            <FlexItem>
              <input
                id="password"
                type="password"
                placeholder={
                  utils.getLocalization(
                    'eShop_Admin_AuthenticatePasswordLabel'
                  ) ?? 'Your password '
                }
                value={password}
                onChange={handlePasswordChange}
                className="gc-input__field"
              />
            </FlexItem>
          </Flex>
        </PanelContent>
        <PanelFooter>
          <Flex className="eshop-login__actions">
            <FlexItem isGrow>
              <Button
                className="gc-btn--primary"
                isFull
                onClick={() => {
                  authenticate();
                }}
              >
                {utils.getLocalization('eShop_Admin_AuthenticateSubmit') ??
                  'Authenticate'}
              </Button>
            </FlexItem>
            <FlexItem isGrow>
              <Button
                className="gc-btn--secondary"
                isFull
                onClick={() => {
                  window.location.href = routes.admin;
                }}
              >
                {utils.getLocalization('eShop_Admin_AuthenticateExit') ??
                  'Exit'}
              </Button>
            </FlexItem>
          </Flex>
        </PanelFooter>
      </Panel>
    </Dialog>
  );
}

export default AuthenticateDialog;
