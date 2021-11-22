import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import withProviders from '../../hoc/withTestProviders';
import Drawer from '.';

describe('Drawer', () => {
  const initialState = {
    users: {
      filter: {
        gender: 'male',
        maxDistance: 20000,
        ageRange: [18, 80],
        sortBy: 'distance:asc',
        limit: 10,
        skip: 0,
      },
    },
  };
  const Component = withProviders(Drawer, { initialState });

  it('should close drawer on oustside click', async () => {
    const toggleDrawer = jest.fn();
    const { getByTestId, getByRole } = render(
      <Component isDrawerOpen toggleDrawer={toggleDrawer} />
    );
    getByTestId('drawer');
    fireEvent.click(getByRole('presentation').firstChild);
    expect(toggleDrawer).toHaveBeenCalledTimes(1);
    expect(toggleDrawer).toHaveBeenCalledWith(false);
  });

  it('should handle filter', async () => {
    const { getByRole, getAllByRole } = render(<Component isDrawerOpen />);
    fireEvent.mouseDown(getAllByRole('slider')[0], {
      clientX: 19,
      clientY: 20,
    });
    fireEvent.click(getByRole('radio', { name: 'Female' }));

    await waitFor(() =>
      expect(getByRole('button', { name: 'Submit' })).not.toBeDisabled()
    );
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(getByRole('button', { name: 'Submit' })).toBeDisabled()
    );
  });
});
