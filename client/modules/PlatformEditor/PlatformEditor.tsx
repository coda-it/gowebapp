import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Dropdown,
  Panel,
  PanelTitle,
  PanelContent,
  Flex,
  FlexItem,
  Card,
  Separator,
} from 'graphen';
import globalConfig from 'client/config';
import * as types from './types';

function PlatformEditor(props: types.Props) {
  const { config, load, onUpdate, onAdd } = props;
  const { id, landingModule, staticPage, language } = config ?? {};
  const [landingPageInput, setLandingPageInput] = useState(landingModule);
  const [staticPageInput, setStaticPageInput] = useState(staticPage);
  const [languageInput, setLanguageInput] = useState(
    language ?? globalConfig.defaultLanguage
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setLanguageInput(language ?? globalConfig.defaultLanguage);
  }, [language, setLanguageInput]);

  const handleLandingPageInputChange = useCallback(
    (event) => {
      setLandingPageInput(event.target.value);
    },
    [setLandingPageInput]
  );
  const handleStaticPageInputChange = useCallback(
    (event) => {
      setStaticPageInput(event.target.value);
    },
    [setStaticPageInput]
  );
  const handleLanguageInputChange = useCallback(
    (value) => {
      setLanguageInput(value);
    },
    [setLanguageInput]
  );

  return (
    <Panel>
      <PanelTitle>Platform Editor</PanelTitle>
      <PanelContent>
        <Flex isVertical>
          <FlexItem className="gm-spacing-bl">
            <Card>
              <Panel>
                <PanelTitle>Landing page</PanelTitle>
                <PanelContent>
                  <p>
                    Landing page module is a name of view template of a
                    particular module that will be loaded on the root URL
                  </p>
                  <Separator />
                  <div className="gc-input gc-input--full">
                    {/* eslint-disable jsx-a11y/label-has-associated-control */}
                    <label
                      htmlFor="landing-page-title"
                      className="gc-input__label"
                    >
                      Landing Page Module
                    </label>
                    {/* eslint-enable jsx-a11y/label-has-associated-control */}
                    <input
                      id="landing-page"
                      className="gc-input__field tst-landing-page-title"
                      defaultValue={id ? landingModule : ''}
                      onChange={handleLandingPageInputChange}
                    />
                  </div>
                </PanelContent>
              </Panel>
            </Card>
          </FlexItem>
          <FlexItem className="gm-spacing-bl">
            <Card>
              <Panel>
                <PanelTitle>Static module</PanelTitle>
                <PanelContent>
                  <div className="gc-input gc-input--full">
                    {/* eslint-disable jsx-a11y/label-has-associated-control */}
                    <label
                      htmlFor="static-page-title"
                      className="gc-input__label"
                    >
                      Static Page
                    </label>
                    {/* eslint-enable jsx-a11y/label-has-associated-control */}
                    <input
                      id="static-page"
                      className="gc-input__field tst-static-page-title"
                      defaultValue={id ? staticPage : ''}
                      onChange={handleStaticPageInputChange}
                    />
                  </div>
                </PanelContent>
              </Panel>
            </Card>
          </FlexItem>
          {globalConfig.languages.length > 1 && (
            <FlexItem className="gm-spacing-bl">
              <Card>
                <Panel>
                  <PanelTitle>Language</PanelTitle>
                  <PanelContent>
                    <p>
                      This language will be used as a default for this
                      application.
                    </p>
                    <Separator />
                    <Dropdown
                      initValue={{
                        label: languageInput,
                        value: languageInput,
                      }}
                      items={globalConfig.languages.map((lang) => ({
                        label: lang,
                        value: lang,
                      }))}
                      onChange={handleLanguageInputChange}
                    />
                  </PanelContent>
                </Panel>
              </Card>
            </FlexItem>
          )}
          <FlexItem>
            {id ? (
              <Button
                isFull
                className="gc-btn--primary tst-post-editor-add gc-btn"
                onClick={() =>
                  onUpdate({
                    id,
                    landingModule: landingPageInput,
                    staticPage: staticPageInput,
                    language: languageInput,
                  })
                }
              >
                Update
              </Button>
            ) : (
              <Button
                isFull
                className="gc-btn--primary tst-post-editor-add gc-btn"
                onClick={() =>
                  onAdd({
                    landingModule: landingPageInput,
                    staticPage: staticPageInput,
                    language: languageInput,
                  })
                }
              >
                Add
              </Button>
            )}
          </FlexItem>
        </Flex>
      </PanelContent>
    </Panel>
  );
}

export default withRouter(PlatformEditor);
