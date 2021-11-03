import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../components/TestProvider';
import Component from '.';

describe('Header', () => {
  it('should render without crash', () => {
    const initialState = {
      auth: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
    };
    render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
  });
});
