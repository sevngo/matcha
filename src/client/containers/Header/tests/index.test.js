import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';
import initialState from './initialState';

describe('Header', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render menu Icon', () => {
    const { queryByText } = render(
      <TestProvider>
        <Component />
      </TestProvider>,
    );
    expect(queryByText('home')).toBeDefined();
  });
});
