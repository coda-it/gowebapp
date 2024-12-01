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
  const { id, landingModule, staticPage, language, loginRedirectURL } =
    config ?? {};

  const [landingPageInput, setLandingPageInput] = useState(landingModule);
  const [staticPageInput, setStaticPageInput] = useState(staticPage);
  const [languageInput, setLanguageInput] = useState(
    language ?? globalConfig.defaultLanguage
  );
  const [loginRedirectURLInput, setLoginRedirectURLInput] =
    useState(loginRedirectURL);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setLanguageInput(language ?? globalConfig.defaultLanguage);
  }, [language, setLanguageInput]);
  useEffect(() => {
    setLoginRedirectURLInput(loginRedirectURL);
  }, [loginRedirectURL, setLoginRedirectURLInput]);
  useEffect(() => {
    setLandingPageInput(landingModule);
  }, [landingModule, setLandingPageInput]);
  useEffect(() => {
    setStaticPageInput(staticPage);
  }, [staticPage, setStaticPageInput]);

  const handleLandingPageInputChange = useCallback(
    (value) => {
      setLandingPageInput(value);
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
  const handleLoginRedirectURLInputChange = useCallback(
    (event) => {
      setLoginRedirectURLInput(event.target.value);
    },
    [setLoginRedirectURLInput]
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
                  <p>Module name that will be loaded on the root URL</p>
                  <Separator />
                  <div className="gc-input gc-input--full">
                    <Dropdown
                      initValue={{
                        label: landingPageInput,
                        value: landingPageInput,
                      }}
                      items={[
                        {
                          label: 'post',
                          value: 'post',
                        },
                        {
                          label: 'category',
                          value: 'category',
                        },
                        {
                          label: 'helpdesk',
                          value: 'helpdesk',
                        },
                        {
                          label: 'static',
                          value: 'static',
                        },
                      ]}
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
                  <p>File name for static page view template</p>
                  <Separator />
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
                      defaultValue={id ? staticPage : 'static'}
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
          <FlexItem className="gm-spacing-bl">
            <Card>
              <Panel>
                <PanelTitle>Default page after login</PanelTitle>
                <PanelContent>
                  <p>
                    This URL will be used as a default redirection after logging
                    into admin
                  </p>
                  <div className="gc-input gc-input--full">
                    {/* eslint-disable jsx-a11y/label-has-associated-control */}
                    <label
                      htmlFor="default-login-url"
                      className="gc-input__label"
                    >
                      Default login URL
                    </label>
                    {/* eslint-enable jsx-a11y/label-has-associated-control */}
                    <input
                      id="default-login-url"
                      className="gc-input__field"
                      defaultValue={id ? loginRedirectURLInput : ''}
                      onChange={handleLoginRedirectURLInputChange}
                    />
                  </div>
                </PanelContent>
              </Panel>
            </Card>
          </FlexItem>
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
                    loginRedirectURL: loginRedirectURLInput,
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
                    loginRedirectURL: loginRedirectURLInput,
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
