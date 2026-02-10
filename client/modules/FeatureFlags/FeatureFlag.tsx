import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Flex,
  FlexItem,
  Dialog,
  Switch,
  Separator,
  Panel,
  PanelTitle,
  PanelContent,
  PanelFooter,
} from 'graphen';
import classNames from 'classnames';
import * as actions from 'client/models/featureFlags/actions';
import * as utils from 'client/utils/translations';

type Props = {
  id: string;
  initialKey: string;
  isSwitched: boolean;
};

export default function FeatureFlag({ id, initialKey, isSwitched }: Props) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [featureFlagKey, setFeatureFlagKey] = useState(initialKey);
  const [featureFlagValue, setFeatureFlagValue] = useState(isSwitched);

  const handleClose = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);
  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleUpdate = useCallback(() => {
    dispatch(actions.updateFeatureFlag(id, featureFlagKey, featureFlagValue));
  }, [dispatch, id, featureFlagKey, featureFlagValue]);

  const handleDelete = useCallback(() => {
    dispatch(actions.deleteFeatureFlag(id));
  }, [dispatch, id]);

  const wrapperClasses = classNames({
    'gm-spacing-rl': !isEditing,
    'gm-spacing-bl': isEditing,
  });

  const body = (
    <Flex isVertical={isEditing}>
      <FlexItem className={wrapperClasses}>
        <Flex>
          <FlexItem>
            <div className="gc-input gc-input--full">
              <input
                id="key"
                value={featureFlagKey}
                onChange={(event) => {
                  setFeatureFlagKey(event.target.value);
                }}
                className="gc-input__field"
                disabled={!isEditing}
              />
            </div>
          </FlexItem>
        </Flex>
      </FlexItem>
      <FlexItem className={wrapperClasses}>
        {isEditing ? (
          <div className="gc-input gc-input--full">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="key" className="gc-input__label">
              On / Off
            </label>
            <Switch
              onChange={setFeatureFlagValue}
              isSwitched={featureFlagValue}
              type="success"
            />
          </div>
        ) : (
          <input
            id="key"
            value={featureFlagValue ? 'On' : 'Off'}
            className="gc-input__field"
            disabled
          />
        )}
      </FlexItem>
      {!isEditing && (
        <FlexItem className={wrapperClasses}>
          <Button className="gc-btn--secondary" onClick={handleEdit}>
            {utils.getLocalization('EditButton') ?? 'Edit'}
          </Button>
        </FlexItem>
      )}
    </Flex>
  );

  return isEditing ? (
    <Dialog className="translation-dialog">
      <Panel>
        <PanelTitle>
          {utils.getLocalization('FeatureFlags_Edit_Title') ??
            'Edit Feature Flag'}
        </PanelTitle>
        <PanelContent>
          {body}
          <Separator />
        </PanelContent>
        <PanelFooter>
          <Flex className="translation-dialog__actions">
            <FlexItem isGrow>
              <Button className="gc-btn--primary" onClick={handleUpdate} isFull>
                {utils.getLocalization('UpdateButton') ?? 'Update'}
              </Button>
            </FlexItem>
            <FlexItem isGrow>
              <Button className="gc-btn--danger" onClick={handleDelete} isFull>
                {utils.getLocalization('DeleteButton') ?? 'Delete'}
              </Button>
            </FlexItem>
            <FlexItem isGrow>
              <Button
                className="gc-btn--secondary"
                onClick={handleClose}
                isFull
              >
                {utils.getLocalization('CloseButton') ?? 'Close'}
              </Button>
            </FlexItem>
          </Flex>
        </PanelFooter>
      </Panel>
    </Dialog>
  ) : (
    body
  );
}
