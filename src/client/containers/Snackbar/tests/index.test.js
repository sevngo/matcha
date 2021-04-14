import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
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
      <TestProvider initialState={{ snackbar: { variant: 'success' } }}>
        <Component />
      </TestProvider>
    );
    getByTestId('snackbar');
    fireEvent.click(getByTestId('closeSnackbar'));
    expect(queryByTestId('snackbar')).toBeNull();
  });
});
