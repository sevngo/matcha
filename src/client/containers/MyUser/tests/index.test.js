import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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

describe('MyUser', () => {
  it('should be able to click on open file', async () => {
    const { getByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    fireEvent.click(getByTestId('openFile'));
  });
});
