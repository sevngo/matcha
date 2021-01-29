import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Login', () => {
  it('should not show login form', () => {
    const { queryByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('loginForm')).toBeNull();
  });

  it('should open forgot password form', async () => {
    const { queryByTestId } = render(
      <TestProvider initialState={{}}>
        <Component />
      </TestProvider>
    );

    expect(queryByTestId('forgotPasswordForm')).toBeNull();
    fireEvent.click(queryByTestId('forgotPasswordLink'));
    expect(queryByTestId('forgotPasswordForm')).toBeDefined();
  });
});
