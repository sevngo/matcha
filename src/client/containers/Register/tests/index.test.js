import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

jest.mock('axios');

const formatted_address = 'formatted_address';
const longitude = 45.3;
const latitude = 51.1;

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
    Geocoder: function () {
      return {
        geocode: jest.fn((options, cb) => cb([{ formatted_address }], 'OK')),
      };
    },
  },
};

global.navigator.geolocation = {
  getCurrentPosition: (successCallback, errorCallback) =>
    successCallback({
      coords: {
        latitude,
        longitude,
      },
    }),
};

jest.mock('axios');

describe('Register', () => {
  it('should render', async () => {
    const { getByTestId, getByRole } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );

    const username = 'username';
    const password = 'password';
    const email = 'email@email.com';
    const birthDate = moment().subtract(40, 'years').format('YYYY-MM-DD');
    const gender = 'male';

    fireEvent.change(getByTestId('usernameInput'), {
      target: { value: username },
    });
    fireEvent.change(getByTestId('passwordInput'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('passwordEndAdornment'));
    fireEvent.change(getByTestId('emailInput'), {
      target: { value: email },
    });
    fireEvent.change(getByTestId('birthDateInput'), {
      target: { value: birthDate },
    });
    fireEvent.click(getByRole('radio', { name: 'Male' }));
    fireEvent.click(getByTestId('geolocate'));
    await waitFor(() => getByTestId('clearAddress'));
    fireEvent.click(getByTestId('clearAddress'));
    await waitFor(() => getByTestId('geolocate'));
    fireEvent.click(getByTestId('geolocate'));
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/users', {
        password,
        username,
        email,
        birthDate,
        gender,
        address: {
          type: 'Point',
          name: formatted_address,
          coordinates: [longitude, latitude],
        },
      })
    );
  });
});
