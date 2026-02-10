import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Card,
  Button,
  Panel,
  PanelTitle,
  PanelContent,
  Flex,
  FlexItem,
  PanelFooter,
} from 'graphen';
import * as utils from 'client/utils/translations';
import * as actions from 'client/models/featureFlags/actions';
import * as selectors from 'client/models/featureFlags/selectors';
import AddFeatureFlagDialog from './components/AddFeatureFlagDialog';
import FeatureFlag from './FeatureFlag';

function FeatureFlags() {
  const dispatch = useDispatch();

  const [isAddNewDialogOpen, setIsAddNewDialogOpen] = useState(false);

  const featureFlags = useSelector(selectors.getFeatureFlags);

  useEffect(() => {
    dispatch(actions.fetchFeatureFlags());
  }, [dispatch]);

  return (
    <>
      <Panel>
        <PanelTitle>
          {utils.getLocalization('FeatureFlags_Admin_Title') ??
            'Feature Flags Admin'}
        </PanelTitle>
        <PanelContent>
          <Card isGradient>
            <Panel>
              <PanelTitle>
                {utils.getLocalization('FeatureFlags_Admin_Card_Title') ??
                  'Admin'}
              </PanelTitle>
              <PanelContent />
              <PanelFooter>
                <Flex>
                  <FlexItem>
                    <Button
                      className="gc-btn--primary"
                      onClick={() => {
                        setIsAddNewDialogOpen(true);
                      }}
                      isFull
                    >
                      {utils.getLocalization('FeatureFlags_Admin_Add_New') ??
                        'Add new feature flag'}
                    </Button>
                  </FlexItem>
                </Flex>
              </PanelFooter>
            </Panel>
          </Card>
        </PanelContent>
      </Panel>
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
          </Flex>
        </PanelContent>
      </Panel>
      {isAddNewDialogOpen && (
        <AddFeatureFlagDialog onClose={() => setIsAddNewDialogOpen(false)} />
      )}
    </>
  );
}

export default withRouter(FeatureFlags);
