import React, { useEffect, useState } from 'react';
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
import * as selectors from 'client/models/eshop/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as utils from 'client/utils/translations';
import AuthenticateDialog from './components/AuthenticateDialog';
import ProductList from './components/ProductList';
import AddProductDialog from './components/AddProductDialog';

function EShopAdmin() {
  const dispatch = useDispatch();
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

  const user = useSelector(userSelectors.getUser);
  const jwt = useSelector(selectors.getJWTToken);

  useEffect(() => {
    dispatch(actions.fetchProductsRequest());

    const token = localStorage.getItem(
      eshopConstants.ESHOP_JWT_LOCAL_STORAGE_KEY
    );
    dispatch(actions.validateJwtTokenRequest(token));
  }, []);

  const products = useSelector(selectors.getProducts);

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
                        setIsAddProductDialogOpen(true);
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
        {isAddProductDialogOpen && (
          <AddProductDialog
            onClose={() => {
              setIsAddProductDialogOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default withRouter(EShopAdmin);
