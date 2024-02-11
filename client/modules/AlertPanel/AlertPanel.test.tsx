import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AlertPanel from './AlertPanel';

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
      {
        type: 'info',
        message: 'Message 2',
        timestamp: new Date('2020-03-01'),
        isOld: false,
      },
      {
        type: 'info',
        message: 'Message 3',
        timestamp: new Date('2020-03-01'),
        isOld: false,
      },
    ],
  },
};
const store = mockStore(initialState);

describe('AlertPanel/AlertPanel', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <AlertPanel />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
