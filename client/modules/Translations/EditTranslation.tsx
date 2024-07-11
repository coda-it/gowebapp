import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Flex, FlexItem, Dropdown } from 'graphen';
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
  const [translationKey, setTranslationKey] = useState(initialKey);
  const [translationValue, setTranslationValue] = useState(initialValue);
  const [translationLanguage, setTranslationLanguage] =
    useState(initialLanguage);

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

  return (
    <Flex>
      <FlexItem className="gm-spacing-rl">
        <div className="gc-input gc-input--full">
          <input
            id="key"
            value={translationKey}
            onChange={(event) => {
              setTranslationKey(event.target.value);
            }}
            className="gc-input__field"
          />
        </div>
      </FlexItem>
      <FlexItem className="gm-spacing-rl">
        <div className="gc-input gc-input--full">
          <input
            id="value"
            value={translationValue}
            onChange={(event) => {
              setTranslationValue(event.target.value);
            }}
            className="gc-input__field"
          />
        </div>
      </FlexItem>
      <FlexItem className="gm-spacing-rl">
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
        />
      </FlexItem>
      <FlexItem className="gm-spacing-rl">
        <Button className="gc-btn--primary" onClick={handleUpdate}>
          {utils.getLocalization('UpdateButton') ?? 'Update'}
        </Button>
      </FlexItem>
      <FlexItem>
        <Button className="gc-btn--danger" onClick={handleDelete}>
          {utils.getLocalization('DeleteButton') ?? 'Delete'}
        </Button>
      </FlexItem>
    </Flex>
  );
}
