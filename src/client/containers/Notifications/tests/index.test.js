import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Notifications', () => {
  it('should match snapshot', () => {
    const initialState = {
      auth: {
        notifications: [
          {
            user: {
              _id: '5caf003feaca23291c0cec34',
              username: 'qweqwe',
            },
            createdAt: '2020-01-23T14:10:55.857Z',
            _id: '5e29a96f7e701b58a77dcdbb',
            messageId: 'friendLogged',
          },
          {
            user: {
              _id: '5caf003feaca23291c0cec36',
              username: 'asdasd',
            },
            createdAt: '2020-01-23T14:11:55.857Z',
            _id: '5e29a96f7e701b58a77dcdba',
            messageId: 'friendLogged',
          },
        ],
      },
    };
    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
