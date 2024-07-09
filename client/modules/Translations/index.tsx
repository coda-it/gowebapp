import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button,
  Panel,
  PanelTitle,
  PanelContent,
  Flex,
  FlexItem,
  PanelFooter,
} from 'graphen';
import * as utils from 'client/utils/translations';
import * as actions from 'client/models/translations/actions';

function Translations() {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('');

  const handleAddTranslation = useCallback(() => {
    dispatch(actions.addTranslation(key, value, language));
  }, [dispatch, key, value, language]);

  return (
    <Panel>
      <PanelTitle>
        {utils.getLocalization('Translations_Title') ?? 'Translations'}
      </PanelTitle>
      <PanelContent>
        <Flex wrap="wrap" isVertical>
          <FlexItem>
            <Flex>
              <FlexItem>
                <div className="gc-input gc-input--full">
                  {/* eslint-disable jsx-a11y/label-has-associated-control */}
                  <label htmlFor="key" className="gc-input__label">
                    Key
                  </label>
                  {/* eslint-enable jsx-a11y/label-has-associated-control */}
                  <input
                    id="key"
                    value={key}
                    onChange={(event) => {
                      setKey(event.target.value);
                    }}
                    className="gc-input__field"
                  />
                </div>
              </FlexItem>
              <FlexItem>
                <div className="gc-input gc-input--full">
                  {/* eslint-disable jsx-a11y/label-has-associated-control */}
                  <label htmlFor="value" className="gc-input__label">
                    Value
                  </label>
                  {/* eslint-enable jsx-a11y/label-has-associated-control */}
                  <input
                    id="value"
                    value={value}
                    onChange={(event) => {
                      setValue(event.target.value);
                    }}
                    className="gc-input__field"
                  />
                </div>
              </FlexItem>
              <FlexItem>
                <div className="gc-input gc-input--full">
                  {/* eslint-disable jsx-a11y/label-has-associated-control */}
                  <label htmlFor="language" className="gc-input__label">
                    Language
                  </label>
                  {/* eslint-enable jsx-a11y/label-has-associated-control */}
                  <input
                    id="language"
                    value={language}
                    onChange={(event) => {
                      setLanguage(event.target.value);
                    }}
                    className="gc-input__field"
                  />
                </div>
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
