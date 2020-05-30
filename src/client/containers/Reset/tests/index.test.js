import React from 'react';
import { render } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Reset', () => {
  it('should match snapshot', () => {
    const props = { match: { params: {} } };
    const { container } = render(
      <TestProvider>
        <Component {...props} />
      </TestProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
