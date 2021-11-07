import React from 'react';
import { render } from '@testing-library/react';
import withTestProviders from '../../hoc/withTestProviders';
import Loader from '.';

describe('Loader', () => {
  it('should render', () => {
    const initialState = { loading: true };
    const Component = withTestProviders(Loader, { initialState });

    render(<Component />);
  });
});
