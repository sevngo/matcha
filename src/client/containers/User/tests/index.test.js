import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('User', () => {
  it('should render', async () => {
    render(
      <TestProvider
        initialState={{
          auth: { _id: '60084a46203c4e342b14114c' },
          user: {
            _id: '60084a46203c4e342b13114c',
            username: 'Shanie21',
            birthDate: '1998-03-03T13:43:52.868Z',
            gender: 'male',
            address: {
              name: '247 Bert Village',
            },
          },
        }}
      >
        <Component />
      </TestProvider>
    );
  });
});
