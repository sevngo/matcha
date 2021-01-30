import React from 'react';
import axios from 'axios';
import { fireEvent, render, waitFor } from '@testing-library/react';
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

describe('MyUser', () => {
  const initialState = {
    auth: {
      _id: '6008432b6ed92c2ac837ec6c',
      username: 'asdasd',
      email: 'asdasd@asdasd.com',
      gender: 'female',
      birthDate: '1991-01-20T00:00:00.000Z',
      address: {
        name: '5 Allée Claude Chastillon, 93290 Tremblay-en-France, France',
        type: 'Point',
        coordinates: [2.5654428, 48.955157299999996],
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA4NDMyYjZlZDkyYzJhYzgzN2VjNmMiLCJpYXQiOjE2MTEyNTc1MjQsImV4cCI6MTYxMTM0MzkyNH0.suG2IyrXwsI3bOcK1jG7XpasHfwQM1Fip3YrUzX01Pc',
      usersBlocked: [{ _id: '6008432b6ed93c2ac837ec6c' }],
      usersLiked: [{ _id: '6008432b6ed92c2ac837ec6c' }],
    },
  };
  it('should be able to click on open file', async () => {
    const { getByTestId } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    fireEvent.click(getByTestId('openFile'));
  });

  it('should uploadFile', async () => {
    const { getByTestId, findByTestId } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    getByTestId('imageUnavailable');
    axios.post.mockResolvedValue({ data: 'a' });
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    fireEvent.change(getByTestId('uploadFile'), { target: { files: [file] } });
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        '/api/users/image',
        expect.any(FormData)
      )
    );
    findByTestId('imageAvailable');
  });
});
