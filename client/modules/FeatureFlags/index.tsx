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
  Switch,
} from 'graphen';
import * as utils from 'client/utils/translations';
import * as actions from 'client/models/featureFlags/actions';
import * as selectors from 'client/models/featureFlags/selectors';
import FeatureFlag from './FeatureFlag';

function FeatureFlags() {
  const dispatch = useDispatch();
  const [featureFlagKey, setFeatureFlagKey] = useState('');
  const [featureFlagValue, setFeatureFlagValue] = useState(false);

  const featureFlags = useSelector(selectors.getFeatureFlags);

  useEffect(() => {
    dispatch(actions.fetchFeatureFlags());
  }, [dispatch]);

  const handleAddFeatureFlag = useCallback(() => {
    dispatch(actions.addFeatureFlag(featureFlagKey, featureFlagValue));

    setFeatureFlagKey('');
    setFeatureFlagValue(false);
  }, [dispatch, featureFlagKey, featureFlagValue]);

  return (
    <Panel>
      <PanelTitle>
        {utils.getLocalization('FeatureFlags_Title') ?? 'Feature Flags'}
      </PanelTitle>
      <PanelContent>
        <Flex wrap="wrap" isVertical>
          {featureFlags.map((featureFlag) => {
            const { key, value, id } = featureFlag;

            return (
              <FlexItem key={`translation-item-${key}-${id}`}>
                <FeatureFlag id={id} initialKey={key} isSwitched={value} />
              </FlexItem>
            );
          })}
          <FlexItem className="gm-spacing-tvl">
            <Flex>
              <FlexItem className="gm-spacing-rl">
                <div className="gc-input gc-input--full">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="key" className="gc-input__label">
                    Feature flag key
                  </label>
                  <input
                    id="key"
                    value={featureFlagKey}
                    onChange={(event) => {
                      setFeatureFlagKey(event.target.value);
                    }}
                    className="gc-input__field"
                  />
                </div>
              </FlexItem>
              <FlexItem className="gm-spacing-rl">
                <div className="gc-input gc-input--full">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="key" className="gc-input__label">
                    On / Off
                  </label>
                  <Switch onChange={setFeatureFlagValue} type="success" />
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
          onClick={handleAddFeatureFlag}
        >
          {utils.getLocalization('AddButton') ?? 'Add'}
        </Button>
      </PanelFooter>
    </Panel>
  );
}

export default withRouter(FeatureFlags);
