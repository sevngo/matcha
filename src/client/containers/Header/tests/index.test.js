import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Header', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render menu Icon', () => {
    const { queryByText } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(queryByText('home')).toBeDefined();
  });
});
