import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Account from '../index';

describe('Account', () => {
  const Component = (
    <TestProvider>
      <Account />
    </TestProvider>
  );
  it('should match snapshot', () => {
    const { container } = render(Component);
    expect(container).toMatchSnapshot();
  });

  it('should open menu', () => {
    const { getByTestId } = render(Component);
    fireEvent.click(getByTestId('accountButton'));
    expect(getByTestId('accountMenu')).toBeDefined();
  });
});
