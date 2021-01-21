import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Users', () => {
  it('should render without crash', () => {
    render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
  });
});
