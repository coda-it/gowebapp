import React from 'react';
import { FlexItem } from 'graphen';
import ProductLoader from './ProductLoader';

function ProductListLoader() {
  return (
    <>
      <FlexItem className="eshop-product-list__item gm-spacing-l">
        <ProductLoader />
      </FlexItem>
      <FlexItem className="eshop-product-list__item gm-spacing-l">
        <ProductLoader />
      </FlexItem>
      <FlexItem className="eshop-product-list__item gm-spacing-l">
        <ProductLoader />
      </FlexItem>
    </>
  );
}

export default ProductListLoader;
