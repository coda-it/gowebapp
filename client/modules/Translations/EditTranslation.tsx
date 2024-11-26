import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Flex, FlexItem, Dropdown, Dialog } from 'graphen';
import classNames from 'classnames';
import globalConfig from 'client/config';
import * as actions from 'client/models/translations/actions';
import * as utils from 'client/utils/translations';

type Props = {
  id: string;
  initialKey: string;
  initialValue: string;
  initialLanguage: string;
};

export default function EditTranslation({
  id,
  initialKey,
  initialValue,
  initialLanguage,
}: Props) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [translationKey, setTranslationKey] = useState(initialKey);
  const [translationValue, setTranslationValue] = useState(initialValue);
  const [translationLanguage, setTranslationLanguage] =
    useState(initialLanguage);

  const handleClose = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);
  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);
  const handleUpdate = useCallback(() => {
    dispatch(
      actions.updateTranslation(
        id,
        translationKey,
        translationValue,
        translationLanguage
      )
    );
  }, [dispatch, id, translationKey, translationValue, translationLanguage]);

  const handleDelete = useCallback(() => {
    dispatch(actions.deleteTranslation(id));
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
            value={translationKey}
            onChange={(event) => {
              setTranslationKey(event.target.value);
            }}
            className="gc-input__field"
            disabled={!isEditing}
          />
        </div>
      </FlexItem>
      <FlexItem className={wrapperClasses}>
        <div className="gc-input gc-input--full">
          <input
            id="value"
            value={translationValue}
            onChange={(event) => {
              setTranslationValue(event.target.value);
            }}
            className="gc-input__field"
            disabled={!isEditing}
          />
        </div>
      </FlexItem>
      <FlexItem className={wrapperClasses}>
        <Dropdown
          initValue={{
            label: translationLanguage,
            value: translationLanguage,
          }}
          items={globalConfig.languages.map((lang) => ({
            label: lang,
            value: lang,
          }))}
          onChange={(value) => {
            setTranslationLanguage(value);
          }}
          isDisabled={!isEditing}
        />
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
