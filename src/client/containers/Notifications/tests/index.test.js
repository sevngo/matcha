import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Notifications', () => {
  it('should open notifications then remove one', () => {
    const { getByTestId, queryByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('notifications')).toBeNull();

    fireEvent.click(getByTestId('openNotifications'));
    getByTestId('notifications');

    fireEvent.click(getByTestId('remove-5e29a96f7e701b58a77dcdbb'));
    expect(queryByTestId('remove-5e29a96f7e701b58a77dcdbb')).toBeNull();
  });
});
