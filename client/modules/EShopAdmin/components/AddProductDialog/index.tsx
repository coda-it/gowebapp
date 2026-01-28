import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  Button,
  Flex,
  FlexItem,
  Panel,
  PanelContent,
  PanelFooter,
  PanelTitle,
  Separator,
} from 'graphen';
import * as actions from 'client/models/eshop/actions';
import * as utils from 'client/utils/translations';
import * as constants from '../../constants';

function AddProductDialog({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const handleProductNameChange = useCallback(
    (event) => {
      setProductName(event.target.value);
    },
    [setProductName]
  );
  const handleProductDescriptionChange = useCallback(
    (event) => {
      setProductDescription(event.target.value);
    },
    [setProductDescription]
  );
  const handleProductPriceChange = useCallback(
    (event) => {
      setProductPrice(event.target.value);
    },
    [setProductPrice]
  );

  const createProduct = () => {
    dispatch(
      actions.createProductRequest({
        name: productName,
        description: productDescription,
        price: productPrice,
        image: '',
      })
    );

    setProductName('');
    setProductDescription('');
    setProductPrice(0);
    onClose();
  };

  return (
    <Dialog>
      <Panel>
        <PanelTitle>
          {utils.getLocalization('eShop_Admin_NewProductTitle') ??
            'Add new product'}
        </PanelTitle>
        <PanelContent>
          <Flex isVertical>
            <FlexItem className="gm-spacing-bm">
              <div className="gc-input gc-input--full">
                {/* eslint-disable jsx-a11y/label-has-associated-control */}
                <label htmlFor="product-name" className="gc-input__label">
                  {utils.getLocalization('eShop_Admin_NewProductName') ??
                    'Product name'}
                </label>
                {/* eslint-enable jsx-a11y/label-has-associated-control */}
                <input
                  id="product-name"
                  value={productName}
                  onChange={handleProductNameChange}
                  className="gc-input__field"
                />
              </div>
            </FlexItem>
            <FlexItem className="gm-spacing-bm">
              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <label htmlFor="product-price" className="gc-input__label">
                {utils.getLocalization('eShop_Admin_NewProductPrice') ??
                  'Product price'}{' '}
                ({constants.defaultCurrency})
              </label>
              {/* eslint-enable jsx-a11y/label-has-associated-control */}
              <input
                id="product-price"
                value={productPrice}
                onChange={handleProductPriceChange}
                className="gc-input__field"
              />
            </FlexItem>
            <FlexItem>
              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <label htmlFor="product-description" className="gc-input__label">
                {utils.getLocalization('eShop_Admin_New_Product_Description') ??
                  'Product description'}
              </label>
              {/* eslint-enable jsx-a11y/label-has-associated-control */}
              <textarea
                id="product-description"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                className="gc-textarea"
              />
            </FlexItem>
          </Flex>
        </PanelContent>
        <Separator />
        <PanelFooter>
          <Flex className="eshop-add-product__actions">
            <FlexItem isGrow>
              <Button
                className="gc-btn--primary"
                onClick={() => {
                  createProduct();
                }}
                isFull
              >
                {utils.getLocalization('eShop_Admin_Product_Create') ??
                  'Create'}
              </Button>
            </FlexItem>
            <FlexItem isGrow>
              <Button className="gc-btn--secondary" onClick={onClose} isFull>
                {utils.getLocalization('eShop_Admin_Product_Cancel') ??
                  'Cancel'}
              </Button>
            </FlexItem>
          </Flex>
        </PanelFooter>
      </Panel>
    </Dialog>
  );
}

export default AddProductDialog;
