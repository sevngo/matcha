import React from 'react';
import axios from 'axios';
import { fireEvent, render, waitFor } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

jest.mock('axios');

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

describe('MyUser/index', () => {
  it('should be able to click on open file', async () => {
    const { getByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    fireEvent.click(getByTestId('openFile'));
  });

  it('should uploadFile', async () => {
    const { getByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    fireEvent.change(getByTestId('uploadFile'), { target: { files: [file] } });
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      '/api/users/image',
      expect.any(FormData)
    );
  });
});
