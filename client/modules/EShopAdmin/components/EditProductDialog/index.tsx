import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
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
  Validation,
  Input,
} from 'graphen';
import withBlurInOut from 'client/components/BlurInOut';
import Previewer from 'client/components/Previewer';
import * as actions from 'client/models/eshop/actions';
import * as types from 'client/models/eshop/types';
import * as selectors from 'client/models/eshop/selectors';
import { translations, validators } from 'client/utils';
import * as constants from '../../constants';

function EditProductDialog({
  onClose,
  mode,
  className,
}: {
  onClose: () => void;
  mode: types.ProductEditMode;
  className?: string;
}) {
  const dispatch = useDispatch();
  const isEditMode = mode === types.ProductEditMode.EDIT;

  const editedProduct = useSelector(selectors.getEditedProduct);
  const productName = editedProduct?.name ?? '';
  const productDescription = editedProduct?.description ?? '';
  const productPrice = editedProduct?.price ?? '';
  const productImage = editedProduct?.image ?? null;

  const [isNameInvalid, setIsNameInvalid] = useState(
    !validators.isStringNotEmpty(productName)
  );
  const [isPriceInvalid, setIsPriceInvalid] = useState(
    !validators.isNumeric(productPrice)
  );

  const handleProductNameChange = useCallback(
    (event) => {
      const name = event.target.value;
      if (validators.isStringNotEmpty(name)) {
        setIsNameInvalid(false);
      } else {
        setIsNameInvalid(true);
      }

      dispatch(
        actions.setEditedProduct({
          ...editedProduct,
          name,
        })
      );
    },
    [dispatch, editedProduct, setIsNameInvalid]
  );
  const handleProductDescriptionChange = useCallback(
    (event) => {
      dispatch(
        actions.setEditedProduct({
          ...editedProduct,
          description: event.target.value,
        })
      );
    },
    [dispatch, editedProduct]
  );

  const isFormValid = !isPriceInvalid && !isNameInvalid;

  const handleProductPriceChange = useCallback(
    (event) => {
      const price = event.target.value;

      if (validators.isNumeric(price)) {
        setIsPriceInvalid(false);
      } else {
        setIsPriceInvalid(true);
      }

      dispatch(
        actions.setEditedProduct({
          ...editedProduct,
          price,
        })
      );
    },
    [dispatch, editedProduct, setIsPriceInvalid]
  );

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(productImage);
  const loadImage = useCallback(
    (event: Event) => {
      if (event.currentTarget instanceof FileReader) {
        if (typeof event.currentTarget.result === 'string') {
          setImagePreview(event.currentTarget.result);
        }
      }
    },
    [setImagePreview]
  );
  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files[0];
      setImage(file);

      const fileReader = new FileReader();
      fileReader.addEventListener('load', loadImage);
      fileReader.readAsDataURL(file);
    },
    [setImage, loadImage]
  );

  const createProduct = () => {
    dispatch(
      actions.createProductRequest({
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        imageFile: image,
      })
    );
  };

  const updateProduct = () => {
    if ('id' in editedProduct) {
      dispatch(
        actions.updateProductRequest({
          ...editedProduct,
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          imageFile: image,
        })
      );
    }
  };

  const dialogClasses = classNames(className);

  const priceLabel = `${
    translations.getLocalization('eShop_Admin_NewProductPrice') ??
    'Product price'
  }  ${constants.defaultCurrency}`;

  const priceValidationMessage = isPriceInvalid
    ? translations.getLocalization('eShop_Admin_NewProductPriceValidation') ??
      'Price should be numeric'
    : undefined;

  const nameLabel =
    translations.getLocalization('eShop_Admin_NewProductName') ??
    'Product name';
  const nameValidationMessage = isNameInvalid
    ? translations.getLocalization('eShop_Admin_NewProductNameValidation') ??
      'Name should contain at least one character'
    : undefined;

  return (
    <Dialog className={dialogClasses}>
      <Panel>
        <PanelTitle>
          {isEditMode
            ? translations.getLocalization('eShop_Admin_EditProductTitle') ??
              'Edit product'
            : translations.getLocalization('eShop_Admin_NewProductTitle') ??
              'Add new product'}
        </PanelTitle>
        <PanelContent>
          <Flex isVertical>
            <FlexItem className="gm-spacing-bm">
              <Validation type="danger" message={nameValidationMessage}>
                <Input
                  className="gc-input--full"
                  label={nameLabel}
                  type="text"
                  validation={isNameInvalid ? 'danger' : 'success'}
                  value={productName}
                  onChange={handleProductNameChange}
                />
              </Validation>
            </FlexItem>
            <FlexItem className="gm-spacing-bm">
              <Validation type="danger" message={priceValidationMessage}>
                <Input
                  className="gc-input--full"
                  label={priceLabel}
                  type="text"
                  validation={isPriceInvalid ? 'danger' : 'success'}
                  value={productPrice}
                  onChange={handleProductPriceChange}
                />
              </Validation>
            </FlexItem>
            <FlexItem className="gm-spacing-bm">
              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <label htmlFor="product-description" className="gc-input__label">
                {translations.getLocalization(
                  'eShop_Admin_New_Product_Description'
                ) ?? 'Product description'}
              </label>
              {/* eslint-enable jsx-a11y/label-has-associated-control */}
              <textarea
                id="product-description"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                className="gc-textarea"
              />
            </FlexItem>
            <FlexItem>
              <Flex isVertical alignItems="center">
                <FlexItem>
                  <input
                    type="file"
                    name="product-image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="gm-spacing-bl"
                  />
                </FlexItem>
                <FlexItem>
                  <Previewer
                    className="eshop-edit-product__image"
                    image={imagePreview}
                  />
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>
        </PanelContent>
        <Separator />
        <PanelFooter>
          <Flex className="eshop-edit-product__actions">
            <FlexItem isGrow>
              {isEditMode ? (
                <Button
                  className={classNames({
                    'gc-btn--primary': isFormValid,
                  })}
                  onClick={() => {
                    if (isFormValid) {
                      updateProduct();
                    }
                  }}
                  isFull
                  isDisabled={!isFormValid}
                >
                  {translations.getLocalization('eShop_Admin_Product_Update') ??
                    'Update'}
                </Button>
              ) : (
                <Button
                  className={classNames({
                    'gc-btn--primary': isFormValid,
                  })}
                  onClick={() => {
                    if (isFormValid) {
                      createProduct();
                    }
                  }}
                  isFull
                  isDisabled={!isFormValid}
                >
                  {translations.getLocalization('eShop_Admin_Product_Create') ??
                    'Create'}
                </Button>
              )}
            </FlexItem>
            <FlexItem isGrow>
              <Button className="gc-btn--secondary" onClick={onClose} isFull>
                {translations.getLocalization('eShop_Admin_Product_Cancel') ??
                  'Cancel'}
              </Button>
            </FlexItem>
          </Flex>
        </PanelFooter>
      </Panel>
    </Dialog>
  );
}

export default withBlurInOut(EditProductDialog);
