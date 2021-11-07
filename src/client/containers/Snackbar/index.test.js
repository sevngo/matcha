import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import withTestProviders from '../../hoc/withTestProviders';
import Snackbar from './index';
import { SUCCESS } from './constants';

describe('Snackbar', () => {
  it('should return false', () => {
    const initialState = { snackbar: {} };
    const Component = withTestProviders(Snackbar, { initialState });
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('snackbar')).toBeNull();
  });
  it('should show then close snackbar', () => {
    const initialState = { snackbar: { variant: SUCCESS } };
    const Component = withTestProviders(Snackbar, { initialState });
    const { queryByTestId, getByTestId } = render(<Component />);
    getByTestId('snackbar');
    fireEvent.click(getByTestId('closeSnackbar'));
    expect(queryByTestId('snackbar')).toBeNull();
  });
});
