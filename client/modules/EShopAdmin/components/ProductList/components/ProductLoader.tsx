import React from 'react';
import {
  Card,
  Panel,
  PanelContent,
  PanelFooter,
  PanelTitle,
  Skeleton,
} from 'graphen';

function ProductLoader() {
  return (
    <Card>
      <Panel>
        <PanelTitle>
          <Skeleton />
        </PanelTitle>
        <PanelContent>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </PanelContent>
        <PanelFooter>
          <Skeleton />
        </PanelFooter>
      </Panel>
    </Card>
  );
}

export default ProductLoader;
