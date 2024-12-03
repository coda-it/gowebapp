import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Flex, FlexItem, Dropdown, Dialog, Switch } from 'graphen';
import classNames from 'classnames';
import globalConfig from 'client/config';
import * as actions from 'client/models/featureFlags/actions';
import * as utils from 'client/utils/translations';

type Props = {
  id: string;
  initialKey: string;
  isSwitched: boolean;
};

export default function FeatureFlag({
  id,
  initialKey,
  isSwitched,
}: Props) {
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
    dispatch(
      actions.updateFeatureFlag(
        id,
        featureFlagKey,
        featureFlagValue,
      )
    );
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
      <FlexItem className={wrapperClasses}>
        {isEditing ? (
          <Switch
            onChange={setFeatureFlagValue}
            isSwitched={featureFlagValue}
            type="success"
          />
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
          <Button
            className="gc-btn--secondary gc-btn--full"
            onClick={handleEdit}
          >
            {utils.getLocalization('EditButton') ?? 'Edit'}
          </Button>
        </FlexItem>
      )}
      {isEditing && (
        <FlexItem className={wrapperClasses}>
          <Button
            className="gc-btn--primary gc-btn--full"
            onClick={handleUpdate}
          >
            {utils.getLocalization('UpdateButton') ?? 'Update'}
          </Button>
        </FlexItem>
      )}
      {isEditing && (
        <FlexItem className={wrapperClasses}>
          <Button
            className="gc-btn--danger gc-btn--full"
            onClick={handleDelete}
          >
            {utils.getLocalization('DeleteButton') ?? 'Delete'}
          </Button>
        </FlexItem>
      )}
      {isEditing && (
        <FlexItem className={wrapperClasses}>
          <Button
            className="gc-btn--secondary gc-btn--full"
            onClick={handleClose}
          >
            {utils.getLocalization('CloseButton') ?? 'Close'}
          </Button>
        </FlexItem>
      )}
    </Flex>
  );

  return isEditing ? (
    <Dialog className="translation-dialog">{body}</Dialog>
  ) : (
    body
  );
}
