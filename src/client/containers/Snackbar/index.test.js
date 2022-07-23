import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import withTestProviders from '../../hoc/withTestProviders';
import Snackbar from './index';
import { SUCCESS } from './utils';

describe('Snackbar', () => {
  it('should return false', () => {
    const initialState = { snackbar: {} };
    const Component = withTestProviders(Snackbar, { initialState });
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('snackbar')).not.toBeInTheDocument();
  });
  it('should show then close snackbar', () => {
    const initialState = { snackbar: { variant: SUCCESS } };
    const Component = withTestProviders(Snackbar, { initialState });
    const { queryByTestId, getByTestId } = render(<Component />);
    getByTestId('snackbar');
    fireEvent.click(getByTestId('closeSnackbar'));
    expect(queryByTestId('snackbar')).not.toBeInTheDocument();
  });
});
