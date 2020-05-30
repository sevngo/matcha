import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('App', () => {
  it('should match snapshot', () => {
    const initialState = {
      app: {
        isLoading: true,
      },
    };
    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
