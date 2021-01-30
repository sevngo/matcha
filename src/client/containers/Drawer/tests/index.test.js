import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

describe('Drawer', () => {
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
  it('should close drawer on oustside click', async () => {
    const toggleDrawer = jest.fn();
    const { queryByTestId, getByRole } = render(
      <TestProvider initialState={initialState}>
        <Component isDrawerOpen toggleDrawer={toggleDrawer} />
      </TestProvider>
    );
    expect(queryByTestId('drawer')).toBeDefined();
    fireEvent.click(getByRole('presentation').firstChild);
    expect(toggleDrawer).toHaveBeenCalledTimes(1);
    expect(toggleDrawer).toHaveBeenCalledWith(false);
  });

  it('should handle filter', async () => {
    const { getByRole, getByTestId } = render(
      <TestProvider initialState={initialState}>
        <Component isDrawerOpen />
      </TestProvider>
    );
    fireEvent.click(getByRole('radio', { name: 'Female' }));
    await waitFor(() => !getByTestId('submitForm-drawer').disabled);
    fireEvent.click(getByTestId('submitForm-drawer'));
    await waitFor(() => getByTestId('submitForm-drawer').disabled);
  });
});
