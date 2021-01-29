import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Snackbar', () => {
  it('should return false', () => {
    const { queryByTestId } = render(
      <TestProvider initialState={{ snackbar: {} }}>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('snackbar')).toBeNull();
  });
  it('should show then close snackbar', () => {
    const { queryByTestId, getByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('snackbar')).toBeDefined();
    fireEvent.click(getByTestId('closeSnackbar'));
    expect(queryByTestId('snackbar')).toBeNull();
  });
});
