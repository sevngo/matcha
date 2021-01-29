import React from 'react';
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

describe('OtherUser', () => {
  it('should show user', () => {
    const { queryByTestId } = render(
      <TestProvider>
        <Component id="60084a46203c4e342b13114c" />
      </TestProvider>
    );
    expect(queryByTestId('otherUser')).toBeDefined();
  });

  it('should return false', () => {
    const { queryByTestId } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(queryByTestId('otherUser')).toBeNull();
  });
});
