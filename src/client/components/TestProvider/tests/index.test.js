import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

test('should match snapshot', async () => {
  const { container } = render(<Component />);
  expect(container).toMatchSnapshot();
});
