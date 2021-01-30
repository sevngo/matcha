import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
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

jest.mock('axios');

describe('OtherUser', () => {
  it('should load user then render', async () => {
    const id = '60084a46203c4e342b13114c';
    axios.get.mockResolvedValue({
      data: {
        _id: id,
        username: 'Shanie21',
        birthDate: '1998-03-03T13:43:52.868Z',
        gender: 'male',
        address: {
          name: '247 Bert Village',
        },
      },
    });
    render(
      <TestProvider initialState={{ user: { _id: 'asd' } }}>
        <Component id={id} />
      </TestProvider>
    );
    expect(axios.get).toHaveBeenCalledWith(`/api/users/${id}`);
  });
});
