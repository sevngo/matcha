import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('User', () => {
  it('should render', () => {
    render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
  });
});
