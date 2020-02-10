import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Snackbar', () => {
  it('should match snapshot', () => {
    const initialState = {
      snackbar: {
        variant: 'error',
      },
    };

    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
