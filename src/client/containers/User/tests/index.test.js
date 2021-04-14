import { render } from '@testing-library/react';
import React from 'react';
import TestProvider from '../../../components/TestProvider';
import { userPath } from '../../../utils';
import Component from '../index';

global.google = {
  maps: {
    places: {
      Autocomplete: function () {
        return {
          setTypes: jest.fn(),
          setFields: jest.fn(),
          addListener: jest.fn(),
        };
      },
    },
  },
};

describe('User', () => {
  it('should render OtherUser', async () => {
    render(
      <TestProvider
        initialState={{ auth: { _id: '60084a46203c4e342b14114c' } }}
      >
        <Component />
      </TestProvider>
    );
  });
  it('should render MyUser', async () => {
    const _id = '60084a46203c4e342b14114c';
    const initialEntries = [`/user/${_id}`];
    const path = userPath(':id');
    render(
      <TestProvider
        initialState={{ auth: { _id } }}
        router={{ initialEntries, path }}
      >
        <Component />
      </TestProvider>
    );
  });
});
