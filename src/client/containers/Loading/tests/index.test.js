import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';
import initialState from './initialState';

describe('Loading', () => {
  it('should match snapshot', () => {
    const { container, queryByTestId } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>,
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('loader')).toBeDefined();
  });

  it('should not show loader', () => {
    const { queryByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>,
    );
    expect(queryByTestId('loader')).toBeNull();
  });
});
