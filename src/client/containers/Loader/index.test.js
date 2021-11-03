import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../components/TestProvider';
import Component from '.';

describe('Loader', () => {
  it('should render', () => {
    render(
      <TestProvider initialState={{ loading: true }}>
        <Component />
      </TestProvider>
    );
  });
});
