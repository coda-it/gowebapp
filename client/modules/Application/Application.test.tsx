import _ from 'lodash';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Application from './Application';

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {
  alerts: {
    alerts: [
      {
        type: 'info',
        message: 'Message 1',
        timestamp: new Date('2020-03-01'),
        isOld: false,
      },
    ],
  },
};
const store = mockStore(initialState);

describe('Application', () => {
  it('should render with loader', () => {
    const { container } = render(
      <Provider store={store}>
        <Application isLoaded={false} mount={_.noop}>
          Content
        </Application>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with children', () => {
    jest.useFakeTimers();

    const { container } = render(
      <Provider store={store}>
        <Application isLoaded mount={_.noop}>
          <p>Some content</p>
        </Application>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
