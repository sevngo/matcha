import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from '../../api';
import React from 'react';
import Login from '.';
import withTestProviders from '../../hoc/withTestProviders';

jest.mock('../../api');

describe('Login', () => {
  const Component = withTestProviders(Login);

  it('should fill login form then confirm', async () => {
    const { getByTestId, getByRole } = render(<Component />);

    const username = 'steven1';
    const password = 'steven2';
    fireEvent.change(getByTestId('usernameInput'), {
      target: { value: username },
    });
    fireEvent.change(getByTestId('passwordInput'), {
      target: { value: password },
    });
    axios.post.mockResolvedValue({ data: { token: 'token' } });
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/users/login', {
        password,
        username,
      })
    );
  });

  it('should open forgot password form then close it on outside click', async () => {
    const { queryByTestId, getAllByRole, getByTestId } = render(<Component />);

    expect(queryByTestId('forgotPasswordForm')).not.toBeInTheDocument();
    fireEvent.click(queryByTestId('forgotPasswordLink'));
    getByTestId('forgotPasswordForm');
    fireEvent.click(getAllByRole('presentation')[0].firstChild);
    await waitForElementToBeRemoved(queryByTestId('forgotPasswordForm'));
  });

  it('should fill forgot password form then confirm', async () => {
    const { queryByTestId, getByTestId } = render(<Component />);
    const email = 'email@email.com';

    expect(queryByTestId('forgotPasswordForm')).not.toBeInTheDocument();
    fireEvent.click(queryByTestId('forgotPasswordLink'));
    getByTestId('forgotPasswordForm');
    fireEvent.change(getByTestId('emailInput'), {
      target: { value: email },
    });
    await waitFor(() =>
      expect(
        getByTestId('submitForm-forgotPassword', { name: 'Submit' })
      ).not.toBeDisabled()
    );
    fireEvent.click(getByTestId('submitForm-forgotPassword'));
    await waitForElementToBeRemoved(queryByTestId('forgotPasswordForm'));
    expect(axios.post).toHaveBeenCalledWith('/api/users/forgot', {
      email,
    });
  });
});
