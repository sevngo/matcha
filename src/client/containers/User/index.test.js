import { render } from '@testing-library/react';
import React from 'react';
import withTestProviders from '../../hoc/withTestProviders';
import { userPath } from '../../utils';
import User from './index';

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
    const initialState = { auth: { _id: '60084a46203c4e342b14114c' } };
    const Component = withTestProviders(User, { initialState });

    render(<Component />);
  });
  it('should render MyUser', async () => {
    const _id = '60084a46203c4e342b14114c';
    const initialState = { auth: { _id } };
    const initialEntries = [`/user/${_id}`];
    const path = userPath(':id');
    const Component = withTestProviders(User, {
      initialState,
      initialEntries,
      path,
    });

    render(<Component />);
  });
});
