import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Drawer', () => {
  it('should match snapshot', () => {
    const initialState = {
      users: {
        filter: {
          gender: 'male',
          maxDistance: 20000,
          ageRange: [18, 50],
          sortBy: 'distance:asc',
          limit: 10,
          skip: 0,
        },
      },
    };
    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component isDrawerOpen />
      </TestProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
