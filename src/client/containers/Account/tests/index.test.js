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

  it('should open and close menu', async () => {
    const { queryByTestId } = render(Component);
    expect(queryByTestId('accountMenu')).toBeNull();
    fireEvent.click(queryByTestId('accountButton'));
    expect(queryByTestId('accountMenu')).toBeDefined();
  });
});
