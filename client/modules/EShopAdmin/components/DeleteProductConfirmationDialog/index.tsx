import React from 'react';
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
} from 'graphen';
import withBlurInOut from 'client/components/BlurInOut';
import * as actions from 'client/models/eshop/actions';
import * as selectors from 'client/models/eshop/selectors';
import * as utils from 'client/utils/translations';

function DeleteProductConfirmationDialog({
  productId,
  className,
  onClose,
}: {
  productId: number;
  className?: string;
  onClose: () => void;
}) {
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    selectors.getProductById(state, productId)
  );

  const deleteProduct = () => {
    dispatch(actions.deleteProductRequest(productId));
  };

  const dialogClasses = classNames(className);

  return (
    <Dialog className={dialogClasses}>
      <Panel>
        <PanelTitle>
          {utils.getLocalization(
            'eShop_Admin_DeleteProductConfirmationTitle'
          ) ?? 'Delete product'}
        </PanelTitle>
        <PanelContent>
          {product.name}
          <Separator />
        </PanelContent>
        <PanelFooter>
          <Flex className="eshop-edit-product__actions">
            <FlexItem isGrow>
              <Button
                className="gc-btn--danger"
                onClick={() => {
                  deleteProduct();
                }}
                isFull
              >
                {utils.getLocalization('eShop_Admin_Product_Update') ??
                  'Delete'}
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

export default withBlurInOut(DeleteProductConfirmationDialog);
