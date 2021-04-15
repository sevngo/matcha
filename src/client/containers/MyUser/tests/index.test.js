import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import axios from '../../../api';
import React from 'react';
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

jest.mock('../../../api');

describe('MyUser', () => {
  const authId = '6008432b6ed92c2ac837ec6c';
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
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
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
    axios.post.mockResolvedValue({ data: { image: 'a' } });
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    fireEvent.change(getByTestId('uploadFile'), { target: { files: [file] } });
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        `/api/users/${authId}/image`,
        expect.any(FormData)
      )
    );
    await findByTestId('imageAvailable');
  });

  it('should update my user', async () => {
    const { getByRole } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );
    fireEvent.click(getByRole('radio', { name: 'Male' }));
    axios.patch.mockResolvedValue({ data: { gender: 'male' } });
    fireEvent.click(getByRole('button', { name: 'Submit' }));

    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        `/api/users`,
        {
          address: {
            coordinates: [2.5654428, 48.955157299999996],
            name: '5 Allée Claude Chastillon, 93290 Tremblay-en-France, France',
            type: 'Point',
          },
          birthDate: '1991-01-20',
          email: 'asdasd@asdasd.com',
          gender: 'male',
          username: 'asdasd',
        },
        { headers: { Authorization: 'Bearer undefined' } }
      )
    );
    await waitFor(() => getByRole('button', { name: 'Submit' }).disabled);
  });

  it('should dislike user', async () => {
    const { getByRole } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>
    );

    axios.patch.mockResolvedValue({ data: { usersLiked: [] } });
    fireEvent.click(getByRole('button', { name: 'Dislike' }));
    await waitForElementToBeRemoved(getByRole('button', { name: 'Dislike' }));
  });
});
