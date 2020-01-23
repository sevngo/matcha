import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';
import initialState from './initialState';

describe('Notifications', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <TestProvider initialState={initialState}>
        <Component />
      </TestProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
