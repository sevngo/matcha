import React from 'react';
import { render } from '@testing-library/react';
import withTestProviders from '../../hoc/withTestProviders';
import PointerEvents from './index';

describe('PointerEvents', () => {
  const Component = withTestProviders(PointerEvents);

  it('should render', () => {
    render(<Component />);
  });
});
