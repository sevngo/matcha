import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Users', () => {
  it('should match snapshot', () => {
    const initialState = {
      users: {
        data: [
          {
            _id: '5caf003feaca23291c0cec34',
            username: 'qweqwe',
            gender: 'male',
            birthDate: '2000-08-08T00:00:00.000Z',
            images: [
              {
                _id: '5caf005beaca23291c0cec35',
              },
            ],
            address: {
              name: 'Boulevard Raspail, Paris, France',
            },
            distance: 0.90393223871161,
          },
        ],
        total: 13,
      },
    };

    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
