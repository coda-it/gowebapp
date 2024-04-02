import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

describe('AlertPanel/Alert', () => {
  it('should render correctly', () => {
    const { container } = render(<Alert type="type-class">Message</Alert>);

    // @ts-ignore
    expect(container.firstChild).toMatchSnapshot();
  });
});
