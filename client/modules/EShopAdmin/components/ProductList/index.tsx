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
import * as utils from 'client/utils/translations';
import * as actions from 'client/models/eshop/actions';
import * as constants from '../../constants';

function ProductList({ products }: { products: any[] }) {
  const dispatch = useDispatch();

  const deleteProduct = (productId: number) => {
    dispatch(actions.deleteProductRequest(productId));
  };

  return (
    <>
      {products.map(({ id, name, description, price }) => (
        <FlexItem key={`product-${id}`} className="gm-spacing-l">
          <Card isGradient>
            <Panel>
              <PanelTitle>{name}</PanelTitle>
              <PanelContent>
                <Flex isVertical className="eshop__product">
                  <FlexItem className="eshop__product-price">
                    {price} {constants.defaultCurrency}
                  </FlexItem>
                  <FlexItem>{description}</FlexItem>
                </Flex>
              </PanelContent>
              <Separator />
              <PanelFooter>
                <Flex alignItems="center">
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
      ))}
    </>
  );
}

export default ProductList;
