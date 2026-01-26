import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  FlexItem,
  Card,
  Panel,
  PanelContent,
  PanelTitle,
  PanelFooter,
  Button,
  Dialog,
  Separator,
} from 'graphen';
import * as actions from 'client/models/eshop/actions';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as eshopConstants from 'client/models/eshop/constants';
import * as selectors from 'client/models/eshop/selectors';
import * as userSelectors from 'client/models/users/selectors';
import * as utils from 'client/utils/translations';

const defaultCurrency = 'PLN';

function EShopAdmin() {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  const jwt = useSelector(selectors.getJWTToken);

  const [password, setPassword] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const handlePasswordChange = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
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

  useEffect(() => {
    dispatch(actions.fetchProductsRequest());

    const token = localStorage.getItem(
      eshopConstants.ESHOP_JWT_LOCAL_STORAGE_KEY
    );
    dispatch(actions.validateJwtTokenRequest(token));
  }, []);

  const deleteProduct = (productId: number) => {
    dispatch(actions.deleteProductRequest(productId));
  };
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
  };
  const authenticate = useCallback(() => {
    if (user && password) {
      const { username } = user;

      dispatch(actions.getJwtTokenRequest(username, password));
      return;
    }

    dispatch(
      alertActions.addAlert(
        utils.getLocalization('eShop_Admin_Authenticate_Missing_Data') ??
          'User data or password is not provided',
        alertConstants.ALERT_TYPE_ERROR
      )
    );
  }, [user, password]);

  const products = useSelector(selectors.getProducts);

  return (
    <div className="gc-panel">
      <div className="gc-panel__title">e-Shop admin</div>
      <div className="gc-panel__content gc-flex--wrap">
        <Flex wrap="wrap">
          {products.map(({ id, name, description, price }) => (
            <FlexItem key={`product-${id}`} className="gm-spacing-l">
              <Card isGradient>
                <Panel>
                  <PanelTitle>{name}</PanelTitle>
                  <PanelContent>
                    <Flex isVertical className="eshop__product">
                      <FlexItem className="eshop__product-price">
                        {price} {defaultCurrency}
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
                          {utils.getLocalization(
                            'eShop_Admin_Product_Delete'
                          ) ?? 'Delete'}
                        </Button>
                      </FlexItem>
                    </Flex>
                  </PanelFooter>
                </Panel>
              </Card>
            </FlexItem>
          ))}
          <FlexItem className="gm-spacing-l">
            <Card isGradient>
              <Panel>
                <PanelTitle>
                  {utils.getLocalization('eShop_Admin_New_Product_Title') ??
                    'Add new product'}
                </PanelTitle>
                <PanelContent>
                  <Flex isVertical>
                    <FlexItem className="gm-spacing-bm">
                      <div className="gc-input gc-input--full">
                        {/* eslint-disable jsx-a11y/label-has-associated-control */}
                        <label
                          htmlFor="product-name"
                          className="gc-input__label"
                        >
                          {utils.getLocalization(
                            'eShop_Admin_New_Product_Name'
                          ) ?? 'Product name'}
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
                      <label
                        htmlFor="product-price"
                        className="gc-input__label"
                      >
                        {utils.getLocalization(
                          'eShop_Admin_New_Product_Price'
                        ) ?? 'Product price'}{' '}
                        ({defaultCurrency})
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
                      <label
                        htmlFor="product-description"
                        className="gc-input__label"
                      >
                        {utils.getLocalization(
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
                  </Flex>
                </PanelContent>
                <Separator />
                <PanelFooter>
                  <Flex>
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
                  </Flex>
                </PanelFooter>
              </Panel>
            </Card>
          </FlexItem>
        </Flex>
      </div>
      {!jwt && (
        <Dialog isOverlay>
          <Panel>
            <PanelTitle>
              {utils.getLocalization('eShop_Admin_Authenticate_Title') ??
                'Authenticate to e-shop'}
            </PanelTitle>
            <PanelContent>
              <Flex isVertical>
                <FlexItem className="gm-spacing-bm">
                  {utils.getLocalization('eShop_Admin_Authenticate_Content') ??
                    'Authenticate to e-shop with password.'}
                </FlexItem>
                <FlexItem>
                  <input
                    id="password"
                    type="password"
                    placeholder={
                      utils.getLocalization(
                        'eShop_Admin_Authenticate_Password_Label'
                      ) ?? 'Your password '
                    }
                    value={password}
                    onChange={handlePasswordChange}
                    className="gc-input__field"
                  />
                </FlexItem>
              </Flex>
            </PanelContent>
            <PanelFooter>
              <Button
                className="gc-btn--primary"
                isFull
                onClick={() => {
                  authenticate();
                }}
              >
                {utils.getLocalization('eShop_Admin_Authenticate_Submit') ??
                  'Authenticate'}
              </Button>
            </PanelFooter>
          </Panel>
        </Dialog>
      )}
    </div>
  );
}

export default withRouter(EShopAdmin);
