import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import TestProvider from '../../../components/TestProvider';
import Component from '../index';

jest.mock('axios');

describe('Reset', () => {
  it('should render', async () => {
    const { getByTestId, getByRole } = render(
      <TestProvider>
        <Component />
      </TestProvider>
    );

    const password = 'password';

    fireEvent.change(getByTestId('passwordInput'), {
      target: { value: password },
    });
    axios.patch.mockResolvedValue({
      data: {
        address: {
          coordinates: [2.5654428, 48.955157299999996],
          name: '5 Allée Claude Chastillon, 93290 Tremblay-en-France, France',
          type: 'Point',
        },
        birthDate: '1991-01-20',
        email: 'asdasd@asdasd.com',
        gender: 'male',
        username: 'asdasd',
      },
    });
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        `/api/users`,
        { password },
        { headers: { Authorization: 'Bearer undefined' } }
      )
    );
  });
});
