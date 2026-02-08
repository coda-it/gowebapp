import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  Flex,
  FlexItem,
  Panel,
  PanelContent,
  PanelFooter,
  PanelTitle,
  Separator,
} from 'graphen';
import Previewer from 'client/components/Previewer';
import * as utils from 'client/utils/translations';
import * as actions from 'client/models/eshop/actions';
import * as types from 'client/models/eshop/types';
import * as constants from '../../constants';

function ProductList({ products }: { products: any[] }) {
  const dispatch = useDispatch();

  const deleteProduct = (productId: number) => {
    dispatch(actions.deleteProductRequest(productId));
  };
  const editProduct = (product: types.Product) => {
    dispatch(actions.setEditMode(types.ProductEditMode.EDIT));
    dispatch(actions.setEditedProduct(product));
  };

  return (
    <>
      {products.map((product) => {
        const { id, name, price, image } = product;

        return (
          <FlexItem
            key={`product-${id}`}
            className="eshop-product-list__item gm-spacing-l"
          >
            <Card isGradient>
              <Panel>
                <PanelTitle className="eshop-product-list__title">
                  {name}
                </PanelTitle>
                <PanelContent>
                  <Flex isVertical className="eshop__product">
                    <FlexItem className="eshop__product-price">
                      {price} {constants.defaultCurrency}
                    </FlexItem>
                    <FlexItem>
                      <Previewer
                        className="eshop-product-list__previewer"
                        image={image}
                      />
                    </FlexItem>
                  </Flex>
                </PanelContent>
                <Separator />
                <PanelFooter>
                  <Flex
                    className="eshop-product-list__actions"
                    alignItems="center"
                  >
                    <FlexItem>
                      <Button
                        className="gc-btn--secondary gc-btn--small"
                        onClick={() => {
                          editProduct(product);
                        }}
                      >
                        {utils.getLocalization('eShop_Admin_Product_Edit') ??
                          'Edit'}
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button
                        className="gc-btn--danger gc-btn--small"
                        onClick={() => {
                          deleteProduct(id);
                        }}
                      >
                        {utils.getLocalization('eShop_Admin_Product_Delete') ??
                          'Delete'}
                      </Button>
                    </FlexItem>
                  </Flex>
                </PanelFooter>
              </Panel>
            </Card>
          </FlexItem>
        );
      })}
    </>
  );
}

export default ProductList;
