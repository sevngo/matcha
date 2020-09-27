import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Loader', () => {
  it('should match snapshot', () => {
    const initialState = {
      loading: true,
    };
    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
