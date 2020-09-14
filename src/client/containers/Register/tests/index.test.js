import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

global.google = {
  maps: {
    places: {
      Autocomplete: jest.fn(() => ({
        setTypes: jest.fn(),
        setFields: jest.fn(),
        addListener: jest.fn(),
      })),
    },
  },
};

describe('Register', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
