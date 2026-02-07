import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Card,
  Panel,
  PanelContent,
  PanelTitle,
  PanelFooter,
  Separator,
  Button,
  FlexItem,
} from 'graphen';
import * as actions from 'client/models/eshop/actions';
import * as eshopConstants from 'client/models/eshop/constants';
import * as types from 'client/models/eshop/types';
import * as selectors from 'client/models/eshop/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as utils from 'client/utils/translations';
import AuthenticateDialog from './components/AuthenticateDialog';
import ProductList from './components/ProductList';
import EditProductDialog from './components/EditProductDialog';

function EShopAdmin() {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.getUser);
  const jwt = useSelector(selectors.getJWTToken);
  const productEditMode = useSelector(selectors.getProductEditMode);
  const products = useSelector(selectors.getProducts);

  useEffect(() => {
    dispatch(actions.fetchProductsRequest());

    const token = localStorage.getItem(
      eshopConstants.ESHOP_JWT_LOCAL_STORAGE_KEY
    );
    dispatch(actions.validateJwtTokenRequest(token));
  }, []);

  const setProductEditMode = (mode: types.ProductEditMode) => {
    dispatch(actions.setEditedProduct(null));
    dispatch(actions.setEditMode(mode));
  };

  return (
    <>
      <div className="gc-panel">
        <div className="gc-panel__title">e-Shop admin</div>
        <div className="gc-panel__content gc-flex--wrap">
          <Card isGradient>
            <Panel>
              <PanelTitle>Admin</PanelTitle>
              <PanelContent />
              <Separator />
              <PanelFooter>
                <Flex>
                  <FlexItem>
                    <Button
                      className="gc-btn--primary"
                      onClick={() => {
                        setProductEditMode(types.ProductEditMode.CREATE);
                      }}
                      isFull
                    >
                      {utils.getLocalization(
                        'eShop_Admin_Product_Add_New_Product'
                      ) ?? 'Add new product'}
                    </Button>
                  </FlexItem>
                </Flex>
              </PanelFooter>
            </Panel>
          </Card>
        </div>
      </div>
      <div className="gc-panel">
        <div className="gc-panel__title">Products</div>
        <div className="gc-panel__content gc-flex--wrap">
          <Flex wrap="wrap">
            <ProductList products={products} />
          </Flex>
        </div>
        {!jwt && <AuthenticateDialog username={user?.username} />}
        {productEditMode && (
          <EditProductDialog
            mode={productEditMode}
            onClose={() => {
              setProductEditMode(null);
            }}
          />
        )}
      </div>
    </>
  );
}

export default withRouter(EShopAdmin);
