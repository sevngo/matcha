import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Account from '../index';

describe('Account', () => {
  const Component = (
    <TestProvider>
      <Account />
    </TestProvider>
  );

  it('should open and close menu by clicking logout', async () => {
    const { queryByTestId } = render(Component);
    expect(queryByTestId('accountMenu')).toBeNull();
    fireEvent.click(queryByTestId('accountButton'));
    expect(queryByTestId('accountMenu')).toBeDefined();
    fireEvent.click(queryByTestId('logout'));
    await waitForElementToBeRemoved(queryByTestId('accountMenu'));
  });

  it('should open and close menu by clicking users', async () => {
    const { queryByTestId } = render(Component);
    expect(queryByTestId('accountMenu')).toBeNull();
    fireEvent.click(queryByTestId('accountButton'));
    expect(queryByTestId('accountMenu')).toBeDefined();
    fireEvent.click(queryByTestId('goToUsers'));
    await waitForElementToBeRemoved(queryByTestId('accountMenu'));
  });

  it('should open and close menu by clicking outside', async () => {
    const { queryByTestId, getByRole } = render(Component);
    expect(queryByTestId('accountMenu')).toBeNull();
    fireEvent.click(queryByTestId('accountButton'));
    expect(queryByTestId('accountMenu')).toBeDefined();
    fireEvent.click(getByRole('presentation').firstChild);
    await waitForElementToBeRemoved(queryByTestId('accountMenu'));
  });
});
