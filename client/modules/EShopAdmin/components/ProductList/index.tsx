import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import * as selectors from 'client/models/eshop/selectors';
import * as constants from '../../constants';
import ProductListLoader from './components/ProductListLoader';

function ProductList({ products }: { products: any[] }) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectors.isProductsLoading);
  const setDeleteProduct = (productId: number) => {
    dispatch(actions.setProductToDelete(productId));
  };
  const editProduct = (product: types.Product) => {
    dispatch(actions.setEditMode(types.ProductEditMode.EDIT));
    dispatch(actions.setEditedProduct(product));
  };

  return (
    <>
      {isLoading && <ProductListLoader />}
      {!isLoading &&
        products.map((product) => {
          const { id, name, price, image } = product;

          return (
            <FlexItem
              key={`product-${id}`}
              className="eshop-product-list__item"
            >
              <Card className="eshop-product-list__card">
                <Panel className="eshop-product-list__panel">
                  <PanelTitle className="eshop-product-list__title">
                    {name}
                  </PanelTitle>
                  <PanelContent>
                    <Flex isVertical className="eshop__product">
                      <FlexItem>
                        <Previewer
                          className="eshop-product-list__previewer"
                          image={image}
                          isRounded
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
                            setDeleteProduct(id);
                          }}
                        >
                          {utils.getLocalization(
                            'eShop_Admin_Product_Delete'
                          ) ?? 'Delete'}
                        </Button>
                      </FlexItem>
                      <FlexItem isGrow />
                      <FlexItem className="eshop__product-price">
                        {price} {constants.defaultCurrency}
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
