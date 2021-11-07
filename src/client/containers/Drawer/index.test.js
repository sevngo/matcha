import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import withTestProviders from '../../hoc/withTestProviders';
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
  const Component = withTestProviders(Drawer, { initialState });

  it('should close drawer on oustside click', async () => {
    const toggleDrawer = jest.fn();
    const { queryByTestId, getByRole } = render(
      <Component isDrawerOpen toggleDrawer={toggleDrawer} />
    );
    expect(queryByTestId('drawer')).toBeDefined();
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
    await waitFor(() => !getByRole('button', { name: 'Submit' }).disabled);
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() => getByRole('button', { name: 'Submit' }).disabled);
  });
});
