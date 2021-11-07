import React from 'react';
import { render } from '@testing-library/react';
import withTestProviders from '../../hoc/withTestProviders';
import Header from '.';

describe('Header', () => {
  it('should render without crash', () => {
    const initialState = {
      auth: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
    };
    const Component = withTestProviders(Header, { initialState });

    render(<Component />);
  });
});
