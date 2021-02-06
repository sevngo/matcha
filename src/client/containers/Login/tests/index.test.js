import React from 'react';
import axios from 'axios';
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '..';

jest.mock('axios');

describe('Login', () => {
  it('should fill login form then confirm', async () => {
    const { getByTestId } = render(
      <TestProvider initialState={{}}>
        <Component />
      </TestProvider>
    );

    const username = 'steven1';
    const password = 'steven2';

    fireEvent.change(getByTestId('usernameInput'), {
      target: { value: username },
    });
    fireEvent.change(getByTestId('passwordInput'), {
      target: { value: password },
    });
    axios.post.mockResolvedValue({ data: { token: 'token' } });
    await act(async () => {
      await waitFor(() => !getByTestId('submitForm-login').disabled);
      fireEvent.click(getByTestId('submitForm-login'));
      await waitFor(() =>
        expect(axios.post).toHaveBeenCalledWith('/api/users/login', {
          password,
          username,
        })
      );
    });
  });

  it('should open forgot password form then close it on outside click', async () => {
    const { queryByTestId, getByRole, getByTestId } = render(
      <TestProvider initialState={{}}>
        <Component />
      </TestProvider>
    );

    expect(queryByTestId('forgotPasswordForm')).toBeNull();
    fireEvent.click(queryByTestId('forgotPasswordLink'));
    getByTestId('forgotPasswordForm');
    fireEvent.click(getByRole('presentation').firstChild);
    await waitForElementToBeRemoved(queryByTestId('forgotPasswordForm'));
  });

  it('should fill forgot password form then confirm', async () => {
    const { queryByTestId, getByTestId } = render(
      <TestProvider initialState={{}}>
        <Component />
      </TestProvider>
    );
    const email = 'email@email.com';

    expect(queryByTestId('forgotPasswordForm')).toBeNull();
    fireEvent.click(queryByTestId('forgotPasswordLink'));
    getByTestId('forgotPasswordForm');
    fireEvent.change(getByTestId('emailInput'), {
      target: { value: email },
    });
    await act(async () => {
      await waitFor(() => !getByTestId('submitForm-forgotPassword').disabled);
      fireEvent.click(getByTestId('submitForm-forgotPassword'));
      await waitForElementToBeRemoved(queryByTestId('forgotPasswordForm'));
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/users/forgot', {
      email,
    });
  });
});
