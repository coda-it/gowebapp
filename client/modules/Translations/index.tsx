import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button,
  Panel,
  PanelTitle,
  PanelContent,
  Flex,
  FlexItem,
  PanelFooter,
  Dropdown,
} from 'graphen';
import globalConfig from 'client/config';
import * as utils from 'client/utils/translations';
import * as actions from 'client/models/translations/actions';
import * as selectors from 'client/models/translations/selectors';
import EditTranslation from './EditTranslation';

function Translations() {
  const dispatch = useDispatch();
  const [translationKey, setTranslationKey] = useState('');
  const [translationValue, setTranslationValue] = useState('');
  const [translationLanguage, setTranslationLanguage] = useState(
    globalConfig.defaultLanguage
  );

  const translations = useSelector(selectors.getTranslations);

  useEffect(() => {
    dispatch(actions.fetchTranslations());
  }, [dispatch]);

  const handleAddTranslation = useCallback(() => {
    dispatch(
      actions.addTranslation(
        translationKey,
        translationValue,
        translationLanguage
      )
    );

    setTranslationKey('');
    setTranslationValue('');
    setTranslationLanguage(globalConfig.defaultLanguage);
  }, [dispatch, translationKey, translationValue, translationLanguage]);
  const handleLanguageChange = useCallback(
    (value) => {
      setTranslationLanguage(value);
    },
    [setTranslationLanguage]
  );

  return (
    <Panel>
      <PanelTitle>
        {utils.getLocalization('Translations_Title') ?? 'Translations'}
      </PanelTitle>
      <PanelContent>
        <Flex wrap="wrap" isVertical>
          {translations.map((translation) => {
            const { key, value, language, id } = translation;

            return (
              <FlexItem key={`translation-item-${key}-${language}`}>
                <EditTranslation
                  id={id}
                  initialKey={key}
                  initialValue={value}
                  initialLanguage={language}
                />
              </FlexItem>
            );
          })}
          <FlexItem className="gm-spacing-tvl">
            <Flex>
              <FlexItem className="gm-spacing-rl">
                <div className="gc-input gc-input--full">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="key" className="gc-input__label">
                    Translation key
                  </label>
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
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="key" className="gc-input__label">
                    Translation value
                  </label>
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
              <FlexItem>
                <Dropdown
                  initValue={{
                    label: translationLanguage,
                    value: translationLanguage,
                  }}
                  items={globalConfig.languages.map((lang) => ({
                    label: lang,
                    value: lang,
                  }))}
                  onChange={handleLanguageChange}
                  label="Language"
                />
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </PanelContent>
      <PanelFooter>
        <Button
          className="gc-btn--primary"
          isFull
          onClick={handleAddTranslation}
        >
          {utils.getLocalization('AddButton') ?? 'Add'}
        </Button>
      </PanelFooter>
    </Panel>
  );
}

export default withRouter(Translations);
