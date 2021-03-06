import React from 'react';
import { mount } from 'enzyme';
import * as constants from 'client/models/alerts/constants';
import AlertPanel from './AlertPanel';

describe('AlertPanel/AlertPanel', () => {
  it('should render correctly', () => {
    const alerts = [
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
    ];

    const component = mount(<AlertPanel alerts={alerts} />);

    expect(component).toMatchSnapshot();
  });
});
