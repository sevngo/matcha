import React from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import TestProvider from '../../components/TestProvider';
import Component from '.';

describe('Notifications', () => {
  const initialState = {
    auth: {
      notifications: [
        {
          user: {
            _id: '5caf003feaca23291c0cec34',
            username: 'qweqwe',
          },
          createdAt: '2020-01-23T14:10:55.857Z',
          id: '5e29a96f7e701b58a77dcdbb',
          event: 'friendLogged',
        },
        {
          user: {
            _id: '5caf003feaca23291c0cec36',
            username: 'asdasd',
          },
          createdAt: '2020-01-23T14:11:55.857Z',
          id: '5e29a96f7e701b58a77dcdba',
          event: 'friendLogged',
        },
      ],
    },
  };
  it('should open notifications then remove one', () => {
    const { getByTestId, queryByTestId } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('notifications')).toBeNull();

    fireEvent.click(getByTestId('openNotifications'));
    getByTestId('notifications');

    fireEvent.click(getByTestId('remove-5e29a96f7e701b58a77dcdbb'));
    expect(queryByTestId('remove-5e29a96f7e701b58a77dcdbb')).toBeNull();
  });

  it('should open then close notifications', async () => {
    const { getByTestId, queryByTestId, getByRole } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('notifications')).toBeNull();

    fireEvent.click(getByTestId('openNotifications'));
    getByTestId('notifications');

    fireEvent.click(getByRole('presentation').firstChild);
    await waitForElementToBeRemoved(queryByTestId('notifications'));
  });
});
