import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Verify', () => {
  it('sould render', () => {
    render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
  });
});
