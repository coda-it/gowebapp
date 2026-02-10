import React, { useCallback, useState } from 'react';
import {
  Button,
  Panel,
  PanelTitle,
  PanelContent,
  Flex,
  FlexItem,
  PanelFooter,
  Switch,
  Dialog,
} from 'graphen';
import * as utils from 'client/utils/translations';
import * as actions from 'client/models/featureFlags/actions';
import { useDispatch } from 'react-redux';

function AddFeatureFlagDialog({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();

  const [featureFlagKey, setFeatureFlagKey] = useState('');
  const [featureFlagValue, setFeatureFlagValue] = useState(false);

  const handleAddFeatureFlag = useCallback(() => {
    dispatch(actions.addFeatureFlag(featureFlagKey, featureFlagValue));

    setFeatureFlagKey('');
    setFeatureFlagValue(false);

    onClose();
  }, [dispatch, featureFlagKey, featureFlagValue]);

  return (
    <Dialog>
      <Panel>
        <PanelTitle>
          {utils.getLocalization('FeatureFlags_Admin_Add_New_Dialog_Title') ??
            'New Feature Flag'}
        </PanelTitle>
        <PanelContent>
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
        </PanelContent>
        <PanelFooter>
          <Flex className="add-feature-flag__actions">
            <FlexItem isGrow>
              <Button
                className="gc-btn--primary"
                isFull
                onClick={handleAddFeatureFlag}
              >
                {utils.getLocalization('AddButton') ?? 'Add'}
              </Button>
            </FlexItem>
            <FlexItem isGrow>
              <Button
                className="gc-btn--secondary"
                isFull
                onClick={() => {
                  onClose();
                }}
              >
                {utils.getLocalization('Close') ?? 'Close'}
              </Button>
            </FlexItem>
          </Flex>
        </PanelFooter>
      </Panel>
    </Dialog>
  );
}

export default AddFeatureFlagDialog;
